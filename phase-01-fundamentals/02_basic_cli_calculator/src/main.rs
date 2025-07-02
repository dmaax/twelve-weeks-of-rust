use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 4 {
        println!("Usage: cargo run <num1> <operator> <num2>");
        return;
    }

    let num1 = &args[1];
    let operator = &args[2];
    let num2 = &args[3];

    match calculate(num1, operator, num2) {
        Ok(result) => println!("Result: {}", result),
        Err(err_msg) => println!("Error: {}", err_msg),
    }
}

fn calculate(num1: &String, operator: &String, num2: &String) -> Result<f64, String> {
    let a = num1
        .parse::<f64>()
        .map_err(|_| format!("Invalid number: {}", num1))?;
    let b = num2
        .parse::<f64>()
        .map_err(|_| format!("Invalid number: {}", num2))?;

    // Match operator to perform calculation
    match operator.as_str() {
        "+" => Ok(a + b),
        "-" => Ok(a - b),
        "*" => Ok(a * b),
        "/" => {
            if b == 0.0 {
                Err("Cannot divide by zero".to_string())
            } else {
                Ok(a / b)
            }
        }
        _ => Err(format!("Unknown operator: {}", operator)),
    }
}
