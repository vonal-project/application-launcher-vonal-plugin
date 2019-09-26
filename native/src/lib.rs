#[macro_use]
extern crate neon;

use neon::prelude::*;

#[no_mangle]
pub extern fn __cxa_pure_virtual() {
    loop{};
}

fn hello(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let query = cx.argument::<JsString>(0)?.value();
    let indices = cx.argument::<JsArray>(1)?.to_vec(&mut cx)?;

    let newone: Vec<&Handle<JsValue>> = indices.iter().filter(|index| index.to_string(&mut cx).unwrap().value() == query).collect();

    Ok(cx.number(newone.len() as f64))
}

register_module!(mut cx, {
    cx.export_function("hello", hello)
});
