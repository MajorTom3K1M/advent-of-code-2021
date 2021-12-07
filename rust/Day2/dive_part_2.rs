struct Submarine;
impl Submarine {
    fn read(instruction: &str) -> Result<(&str, i64), ()> {
        if let [cmd, number] = instruction.split(" ").collect::<Vec<&str>>()[..] {
            return Ok((cmd, number.parse::<i64>().unwrap()));
        }
        Err(())
    }

    pub fn dive(instructions: Vec<&str>) -> Result<(i64, i64, i64), &str> {
        let mut horizontal = 0;
        let mut depth = 0;
        let mut aim = 0;
        for i in 0..instructions.len() {
            let (cmd, number) = Submarine::read(instructions[i]).unwrap();
            match cmd {
                "forward" => {  
                    horizontal += number;
                    depth += number * aim; 
                },
                "down" => { aim += number; },
                "up" => { aim -= number; },
                _ => { return Err("HALT: instruction unknown!"); }
            }
        }
        Ok((horizontal, depth, depth * horizontal))
    }
}

fn main() {
    let instructions: Vec<&str> = include_str!("./input.txt").lines().collect();
    
    let (horizontal, depth, multiply) = Submarine::dive(instructions).unwrap();
    println!("horizontal = {:?}, depth = {:?}, multiply = {:?}", horizontal, depth, multiply);
}