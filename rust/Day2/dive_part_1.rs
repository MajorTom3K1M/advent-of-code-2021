use std::env;
use std::fs;

struct Submarine;
impl Submarine {
    pub fn read(instruction: &str) {
        // println!("{:?}", instruction.split(" ").collect::<Vec<&str>>());
        if let [cmd, number] = instruction.split(" ").collect::<Vec<&str>>()[..] {
            // println!("{:?} {:?}", number, cmd.to_string());
            println!("{:?}", number);
            match cmd {
                "forward" => println!("forward"),
                "down" => println!("down"),
                "up" => println!("up"),
                _ => println!("wah!")
            };
        }
    }

    // pub fn dive(instructions: Vec<String>) -> i32 {

    // }
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let filename = &args[1];
    println!("In file {}", filename);
    let contents = fs::read_to_string(filename)
        .expect("Something went wrong reading the file");

    let instructions: Vec<&str> = contents.split("\r\n").collect();
    Submarine::read(instructions[0]);
}