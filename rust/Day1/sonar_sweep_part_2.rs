use std::env;
use std::fs;

struct Sonar;
impl Sonar {
    pub fn sweep(depths: Vec<i32>) -> i32 {
        let window_size = 3;
        let mut measurement = 0;
        for i in 0..depths.len() - window_size {
            let prev = depths[i..i + window_size].iter().sum::<i32>();
            let cur = depths[i + 1..i + window_size + 1].iter().sum::<i32>();
            if cur > prev {
                measurement += 1;
            }
        }

        measurement
    }
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let filename = &args[1];
    println!("In file {}", filename);
    let contents = fs::read_to_string(filename)
        .expect("Something went wrong reading the file");
    
    let depths: Vec<i32> = contents.split("\r\n").filter_map(|w| w.parse().ok()).collect();
    let count = Sonar::sweep(depths);
    println!("{:?}", count);
}
