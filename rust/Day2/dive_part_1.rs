struct Submarine;
impl Submarine {
    fn read(instruction: &str) -> Result<(&str, i32), ()> {
        if let [cmd, number] = instruction.split(" ").collect::<Vec<&str>>()[..] {
            return Ok((cmd, number.parse::<i32>().unwrap()));
        }
        Err(())
    }

    pub fn dive(instructions: Vec<&str>) -> Result<(i32, i32, i32), &str> {
        let mut horizontal = 0;
        let mut depth = 0;
        for i in 0..instructions.len() {
            let (cmd, number) = Submarine::read(instructions[i]).unwrap();
            match cmd {
                "forward" => { horizontal += number; },
                "down" => { depth += number; },
                "up" => { depth -= number; },
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