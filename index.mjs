import readline from 'readline';
import gradient from 'gradient-string';
import chalk from 'chalk';
import figlet from 'figlet';

// Custom themes
const themes = {
  default: ['#ff5f6d', '#ffc371'],
  umarMg: ['#00ff00', '#00cc00'], // Green theme for UMAR MG matrix
  ocean: ['#00c6ff', '#0072ff'],
  sunset: ['#ff7e5f', '#feb47b'],
};

// Create gradient text
const createGradientText = (text, colors) => gradient(colors)(text);

// Clear console and display message
const clearAndDisplay = (message) => {
  console.clear();
  console.log(message);
};

// Get user input
const getUserInput = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => rl.question(query, (answer) => {
    rl.close();
    resolve(answer);
  }));
};

// Display time dynamically
const displayTime = () => {
  const now = new Date();
  return chalk.yellow(`Time: ${now.toLocaleTimeString()}`);
};

// Display copyright information
const displayCopyright = () => {
  return chalk.gray('© 2025 UMG Team. All rights reserved.');
};

// UMAR MG-themed matrix effect
const umarMgMatrixEffect = () => {
  const chars = 'UMARMG0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let matrixText = '';
  for (let i = 0; i < process.stdout.columns; i++) {
    matrixText += chars[Math.floor(Math.random() * chars.length)];
  }
  return chalk.green(matrixText);
};

// Main function
const main = async () => {
  try {
    // Display banner
    const banner = figlet.textSync('WPBANNER-MG', { horizontalLayout: 'full' });
    clearAndDisplay(createGradientText(banner, themes.default));

    // Ask for theme choice
    const themePrompt = createGradientText('Choose a theme (default, umarMg, ocean, sunset): ', themes.default);
    const theme = await getUserInput(themePrompt);
    const selectedTheme = themes[theme] || themes.default;

    // Ask for WhatsApp number
    const numberPrompt = createGradientText("Input your victim's WhatsApp number with '+' and country code: ", selectedTheme);
    const username = await getUserInput(numberPrompt);

    // Display dynamic updates
    setInterval(() => {
      clearAndDisplay('');

      // Display time
      console.log(displayTime());

      // Display UMAR MG matrix effect
      if (theme === 'umarMg') {
        console.log(umarMgMatrixEffect());
      }

      // Display log message
      const logMessage = `Reports sending by @UMG Team to WhatsApp number @${username}`;
      console.log(createGradientText(logMessage, selectedTheme));

      // Display copyright
      console.log(displayCopyright());
    }, 500);
  } catch (error) {
    console.error(chalk.red('An error occurred:'), error);
  }
};

// Run the program in an infinite loop
const runUnstoppable = () => {
  setInterval(() => {
    main();
  }, 1000);
};

// Start the program
runUnstoppable();