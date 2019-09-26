struct AppIndex {
    name: String,
    generic_name: String,
    exec: String,
}
use std::fmt;

impl fmt::Display for AppIndex {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{} {} ({})", self.name, self.generic_name, self.exec)
    }
}

fn can_match(index: &AppIndex, query: &String) -> bool {
    index.name.contains(query) || index.generic_name.contains(query) || index.exec.contains(query)
}

struct FitnessCheckList {
    begins_with_query : bool,
    contains_query: bool,
    percentage_distance_of_chars : f64
}

fn get_percentage_distance_from_string(name: &String, query: &String) -> f64 {
    // csalamádéalarm
    // alarm
    
    // alamádéalarm     ala     3/5
    // amádéalarm       a       1/5
    // alarm            alarm   5/5 = contains
    // arm              a       1/5

    // lamádéalarm      la      2/4
    // larm             larm    4/4 = contains

    // alamádéalarm     a       1/3
    // amádéalarm       a       1/3
    // alarm            a       1/3
    // arm              arm     3/3 = contains

    // rm               rm      2/2 = contains

    // mádéalarm        m       1/1 = contains
    // m                m       1/1 = contains

    // (5/5 + 4/4 + 3/3 + 2/2 + 1/1) / 5 = 1
    let mut max_result : String;
    let mut result : String;
    for i in query.chars() {
        for j in name.chars() {
            if j == i {
                // innen elindul az összehasonlítás
                result = result + i.to_string()
            } else {
                
            }
        }
    }

    1.5
}

fn fittness(index: &AppIndex, query: &String) -> f64 {
    // num of matched chars
    // full match is a big deal
    // begins with is a huge deal
    let checklist = FitnessCheckList {
        begins_with_query: index.name.starts_with(query),
        contains_query: index.name.contains(query),
        percentage_distance_of_chars: 0f64
    };


    (match checklist.begins_with_query { true => 1f64, _ => 0f64 } * 100f64) 
    + (match checklist.contains_query { true => 1f64, _ => 0f64 } * 50f64)
}

fn main() {
    let indices = vec![
        AppIndex { name: "Chromium".to_string(), generic_name: "Browser".to_string(), exec: "/usr/bin/chromium".to_string()},
        AppIndex { name: "Chroot".to_string(), generic_name: "Root changer".to_string(), exec: "/usr/bin/chroot".to_string()},
        AppIndex { name: "Code - OSS".to_string(), generic_name: "Text editor".to_string(), exec: "code".to_string()},
    ];

    let query = "Ch".to_string();
    let mut filtered_indices : Vec<AppIndex> = indices.into_iter().filter(|x| can_match(&x, &query)).collect();
    filtered_indices.sort_by(|a,b| fittness(&a, &query).partial_cmp(&fittness(&b, &query)).unwrap());
    for i in filtered_indices.iter() {
        
        println!("{}",i)
    }
}
