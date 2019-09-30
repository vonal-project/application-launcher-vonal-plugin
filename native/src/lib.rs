//#[macro_use]
extern crate neon;

mod fuzzy_search;
use fuzzy_search::{get_fuzzy_info, FuzzyInfo};

use neon::prelude::*;

fn search(mut cx: FunctionContext) -> JsResult<JsArray> {
    let query: Handle<JsString> = cx.argument(0)?;
    let app_indices: Handle<JsArray> = cx.argument(1)?;
    let app_indices = app_indices.to_vec(&mut cx)?;

    let mut results: Vec<FuzzyInfo<Handle<JsObject>>> = Vec::with_capacity(app_indices.len());

    for (_i, app_index) in app_indices.iter().enumerate() {
        let index = app_index.downcast::<JsObject>().unwrap();
        let name = index.get(&mut cx, "fuzzybuzz").unwrap();
        let name = name.downcast::<JsString>().unwrap();
        let name = name.to_string(&mut cx).unwrap().value();
        let result = get_fuzzy_info::<Handle<JsObject>>(&query.value(), &name, index);
        results.push(result);
    }

    results.sort_unstable_by(
        |a: &FuzzyInfo<Handle<JsObject>>, b: &FuzzyInfo<Handle<JsObject>>| {
            b.fitness.partial_cmp(&a.fitness).unwrap()
        },
    );

    results.truncate(10);

    let js_array = JsArray::new(&mut cx, results.len() as u32);

    for (i, result) in results.iter().enumerate() {
        let object: Handle<JsObject> = JsObject::new(&mut cx);
        let js_number = cx.number(result.fitness);

        let segments_js_array = JsArray::new(&mut cx, result.segments.len() as u32);
        for (j, obj) in result.segments.iter().enumerate() {
            let js_string = cx.string(obj);
            segments_js_array.set(&mut cx, j as u32, js_string).unwrap();
        }

        object.set(&mut cx, "fitness", js_number).unwrap();
        object.set(&mut cx, "segments", segments_js_array).unwrap();
        object.set(&mut cx, "object", result.object).unwrap();

        js_array.set(&mut cx, i as u32, object).unwrap();
    }
    Ok(js_array)
}

register_module!(mut cx, { cx.export_function("search", search) });
