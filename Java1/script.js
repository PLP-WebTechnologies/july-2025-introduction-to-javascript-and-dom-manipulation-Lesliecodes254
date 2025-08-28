// =============================================================================
// JAVASCRIPT FUNDAMENTALS ASSIGNMENT
// Author: [Your Name]
// Date: [Current Date]
// 
// This script demonstrates:
// - Part 1: Variables, data types, operators, and conditionals
// - Part 2: Functions for reusable code blocks
// - Part 3: Loops for iteration and repetition
// - Part 4: DOM manipulation for interactivity
// =============================================================================

// =============================================================================
// PART 1: JAVASCRIPT BASICS - Variables, Data Types, Operators, Conditionals
// =============================================================================

// Global variables to store user data
let userData = {
    name: '',
    age: 0,
    grade: '',
    isEligibleToVote: false
};

/**
 * Function to process and validate user input data
 * Demonstrates: variables, data types, conditionals, string operations
 */
function processUserData() {
    // Get user input values from DOM elements
    const nameInput = document.getElementById('userName').value;
    const ageInput = parseInt(document.getElementById('userAge').value);
    const gradeInput = document.getElementById('userGrade').value;
    const output = document.getElementById('basicsOutput');

    // Data validation using conditionals
    if (!nameInput || nameInput.trim() === '') {
        output.textContent = 'Error: Please enter your name!';
        output.className = 'output error';
        return;
    }

    if (isNaN(ageInput) || ageInput < 1 || ageInput > 120) {
        output.textContent = 'Error: Please enter a valid age (1-120)!';
        output.className = 'output error';
        return;
    }

    if (!gradeInput) {
        output.textContent = 'Error: Please select your grade!';
        output.className = 'output error';
        return;
    }

    // Store data in global object
    userData.name = nameInput.trim();
    userData.age = ageInput;
    userData.grade = gradeInput;

    // Conditional logic for age categories
    let ageCategory;
    if (ageInput < 13) {
        ageCategory = 'child';
    } else if (ageInput < 20) {
        ageCategory = 'teenager';
    } else if (ageInput < 60) {
        ageCategory = 'adult';
    } else {
        ageCategory = 'senior';
    }

    // Conditional logic for grade feedback using switch statement
    let gradeMessage;
    switch (gradeInput) {
        case 'A':
            gradeMessage = 'Outstanding work! Keep it up! 🌟';
            break;
        case 'B':
            gradeMessage = 'Great job! You\'re doing well! 👍';
            break;
        case 'C':
            gradeMessage = 'Good effort! There\'s room for improvement! 📚';
            break;
        case 'D':
            gradeMessage = 'You can do better! Don\'t give up! 💪';
            break;
        case 'F':
            gradeMessage = 'Time to study harder! You\'ve got this! 🔥';
            break;
        default:
            gradeMessage = 'Invalid grade selected.';
    }

    // Display results using template literals
    const result = `Hello, ${userData.name}!
Age: ${userData.age} (Category: ${ageCategory})
Grade: ${userData.grade}
Feedback: ${gradeMessage}

Data processed successfully! ✅`;

    output.textContent = result;
    output.className = 'output success';

    // Console logging for debugging
    console.log('User data processed:', userData);
}

/**
 * Function to check voting eligibility
 * Demonstrates: conditional statements, boolean logic, logical operators
 */
function checkEligibility() {
    const output = document.getElementById('basicsOutput');
    
    // Check if user data has been processed
    if (!userData.name) {
        output.textContent = 'Please process your data first!';
        output.className = 'output error';
        return;
    }

    // Multiple conditions using logical operators
    const isEligible = userData.age >= 18;
    const canDrink = userData.age >= 21;
    const canRent = userData.age >= 25;

    // Update global variable
    userData.isEligibleToVote = isEligible;

    // Create eligibility report using conditional (ternary) operators
    const eligibilityReport = `${userData.name}'s Eligibility Report:
${isEligible ? '✅' : '❌'} Voting: ${isEligible ? 'Eligible' : 'Not eligible'} (18+)
${canDrink ? '✅' : '❌'} Alcohol: ${canDrink ? 'Eligible' : 'Not eligible'} (21+)
${canRent ? '✅' : '❌'} Car Rental: ${canRent ? 'Eligible' : 'Not eligible'} (25+)

Status: ${isEligible ? 'You can participate in elections!' : 'Wait until you\'re 18!'}`;

    output.textContent = eligibilityReport;
    output.className = isEligible ? 'output success' : 'output';
}

// =============================================================================
// PART 2: JAVASCRIPT FUNCTIONS - Reusable Code Blocks
// =============================================================================

/**
 * Calculator function demonstrating function parameters and return values
 * @param {number} a - First number
 * @param {number} b - Second number
 * @param {string} operation - Mathematical operation
 * @returns {number|string} - Result or error message
 */
function calculate(a, b, operation) {
    // Input validation
    if (isNaN(a) || isNaN(b)) {
        return 'Error: Invalid numbers provided';
    }

    // Switch statement for different operations
    switch (operation) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) {
                return 'Error: Division by zero is not allowed';
            }
            return parseFloat((a / b).toFixed(2));
        default:
            return 'Error: Unknown operation';
    }
}

/**
 * Text formatting function with multiple options
 * @param {string} text - Text to format
 * @param {string} format - Formatting option
 * @returns {string} - Formatted text
 */
function formatTextString(text, format) {
    // Input validation
    if (!text || typeof text !== 'string') {
        return 'Error: Invalid text provided';
    }

    // Format text based on option
    switch (format) {
        case 'uppercase':
            return text.toUpperCase();
        case 'lowercase':
            return text.toLowerCase();
        case 'capitalize':
            return text.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        case 'reverse':
            return text.split('').reverse().join('');
        case 'length':
            return `Text length: ${text.length} characters`;
        default:
            return text;
    }
}

/**
 * Function to perform calculation using user input
 * Demonstrates: function calls, DOM interaction, error handling
 */
function performCalculation() {
    // Get input values
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    const output = document.getElementById('functionsOutput');

    // Call calculator function
    const result = calculate(num1, num2, operation);

    // Operation symbols for display
    const operationSymbols = {
        'add': '+',
        'subtract': '-',
        'multiply': '×',
        'divide': '÷'
    };

    // Display result with appropriate styling
    if (typeof result === 'string' && result.includes('Error')) {
        output.textContent = result;
        output.className = 'output error';
    } else {
        output.textContent = `${num1} ${operationSymbols[operation]} ${num2} = ${result}`;
        output.className = 'output success';
    }

    console.log(`Calculation: ${num1} ${operation} ${num2} = ${result}`);
}

/**
 * Function to format text based on user selection
 * Demonstrates: function parameters, string manipulation
 */
function formatText(format) {
    const textInput = document.getElementById('textInput').value;
    const output = document.getElementById('functionsOutput');

    // Validate input
    if (!textInput.trim()) {
        output.textContent = 'Error: Please enter some text to format!';
        output.className = 'output error';
        return;
    }

    // Call formatting function
    const result = formatTextString(textInput, format);

    // Display formatted result
    output.textContent = `Original: "${textInput}"
Formatted (${format}): "${result}"`;
    output.className = 'output success';
}

// =============================================================================
// PART 3: JAVASCRIPT LOOPS - Iteration and Repetition
// =============================================================================

/**
 * Demonstrate for loop with dynamic content generation
 * Shows: for loop, nested loops, string concatenation
 */
function demonstrateForLoop() {
    const count = parseInt(document.getElementById('loopCount').value);
    const output = document.getElementById('loopsOutput');

    // Validate input
    if (isNaN(count) || count < 1 || count > 10) {
        output.textContent = 'Error: Please enter a valid number (1-10)!';
        output.className = 'output error';
        return;
    }

    let result = 'For Loop Results:\n';
    
    // For loop generating multiplication table
    for (let i = 1; i <= count; i++) {
        result += `${i} × ${count} = ${i * count}\n`;
    }

    // Nested for loop creating a star pattern
    result += '\nPattern Generation:\n';
    for (let i = 1; i <= count; i++) {
        let pattern = '';
        for (let j = 1; j <= i; j++) {
            pattern += '⭐ ';
        }
        result += pattern + '\n';
    }

    output.textContent = result;
    output.className = 'output success';

    console.log('For loop executed with count:', count);
}

/**
 * Demonstrate while loop with condition checking
 * Shows: while loop, accumulator pattern, mathematical sequences
 */
function demonstrateWhileLoop() {
    const count = parseInt(document.getElementById('loopCount').value);
    const output = document.getElementById('loopsOutput');

    // Validate input
    if (isNaN(count) || count < 1 || count > 10) {
        output.textContent = 'Error: Please enter a valid number (1-10)!';
        output.className = 'output error';
        return;
    }

    let result = 'While Loop Results:\n';
    let i = 1;
    let sum = 0;

    // While loop calculating cumulative sum
    while (i <= count) {
        sum += i;
        result += `Step ${i}: Sum = ${sum}\n`;
        i++;
    }

    // While loop with Fibonacci sequence
    result += '\nFibonacci Sequence:\n';
    let a = 0, b = 1, step = 0;
    while (step < count) {
        if (step === 0) {
            result += `${a} `;
        } else if (step === 1) {
            result += `${b} `;
        } else {
            let next = a + b;
            result += `${next} `;
            a = b;
            b = next;
        }
        step++;
    }

    output.textContent = result;
    output.className = 'output success';
}

/**
 * Process array using forEach and other array methods
 * Demonstrates: array methods, forEach loop, functional programming
 */
function processArray() {
    const arrayInput = document.getElementById('arrayInput').value;
    const output = document.getElementById('loopsOutput');

    // Validate input
    if (!arrayInput.trim()) {
        output.textContent = 'Error: Please enter some items!';
        output.className = 'output error';
        return;
    }

    // Create array from input, cleaning empty values
    const items = arrayInput.split(',').map(item => item.trim()).filter(item => item !== '');
    
    if (items.length === 0) {
        output.textContent = 'Error: No valid items found!';
        output.className = 'output error';
        return;
    }

    let result = 'Array Processing Results:\n';
    result += `Original Array: [${items.join(', ')}]\n\n`;

    // forEach loop demonstration
    result += 'Using forEach:\n';
    items.forEach((item, index) => {
        result += `${index + 1}. ${item} (length: ${item.length})\n`;
    });

    // Array methods demonstration
    result += `\nArray Statistics:\n`;
    result += `Total items: ${items.length}\n`;
    result += `Longest item: "${items.reduce((a, b) => a.length > b.length ? a : b)}"\n`;
    result += `Shortest item: "${items.reduce((a, b) => a.length < b.length ? a : b)}"\n`;
    result += `Sorted array: [${[...items].sort().join(', ')}]\n`;

    output.textContent = result;
    output.className = 'output success';

    console.log('Processed array:', items);
}

/**
 * Countdown timer using loops and setTimeout
 * Demonstrates: setInterval, clearInterval, asynchronous operations
 */
function startCountdown() {
    const count = parseInt(document.getElementById('loopCount').value);
    const output = document.getElementById('loopsOutput');

    // Validate input
    if (isNaN(count) || count < 1 || count > 10) {
        output.textContent = 'Error: Please enter a valid number (1-10)!';
        output.className = 'output error';
        return;
    }

    let currentCount = count;
    output.textContent = `Countdown starting from ${count}...\n`;
    output.className = 'output';

    // Use setInterval for countdown
    const countdown = setInterval(() => {
        if (currentCount > 0) {
            output.textContent += `${currentCount}... `;
            currentCount--;
        } else {
            output.textContent += '\n🎉 Countdown Complete! 🎉';
            output.className = 'output success';
            clearInterval(countdown);
        }
    }, 500);
}

// =============================================================================
// PART 4: DOM MANIPULATION - Interactive Web Page Elements
// =============================================================================

// Global variables for DOM manipulation
let isDarkTheme = false;
let elementCounter = 0;
let progressValue = 0;

/**
 * Toggle theme between light and dark mode
 * Demonstrates: element selection, style manipulation, classList operations
 */
function changeTheme() {
    const container = document.querySelector('.container');
    const sections = document.querySelectorAll('.section');
    const output = document.getElementById('domOutput');

    isDarkTheme = !isDarkTheme;

    if (isDarkTheme) {
        // Apply dark theme styles
        container.style.background = '#2c3e50';
        container.style.color = '#ecf0f1';
        
        sections.forEach(section => {
            section.style.background = '#34495e';
            section.style.color = '#ecf0f1';
            section.style.borderLeftColor = '#e74c3c';
        });

        output.textContent = 'Dark theme activated! 🌙';
        output.className = 'output success';
    } else {
        // Apply light theme styles
        container.style.background = 'white';
        container.style.color = '#333';
        
        sections.forEach(section => {
            section.style.background = '#f8f9fa';
            section.style.color = '#333';
            section.style.borderLeftColor = '#667eea';
        });

        output.textContent = 'Light theme activated! ☀️';
        output.className = 'output success';
    }