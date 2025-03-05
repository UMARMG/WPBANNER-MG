import readline from 'readline';
import gradient from 'gradient-string';
import cliProgress from 'cli-progress';

// Create a progress bar instance
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const createGradientText = (text, colors) => gradient(colors)(text);

const clearAndDisplay = (message) => {
  console.clear();
  console.log(message);
};

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

const randomStatusMessages = [
  "Sending report...",
  "Report queued...",
  "Report sent successfully!",
  "Encrypting data...",
  "Connecting to server...",
  "Almost done...",
];

const getRandomMessage = () => randomStatusMessages[Math.floor(Math.random() * randomStatusMessages.length)];

const countdown = async (seconds) => {
  for (let i = seconds; i > 0; i--) {
    clearAndDisplay(createGradientText(`Starting in ${i} seconds...`, ['#ff5f6d', '#ffc371']));
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

const main = async () => {
  // Choose gradient theme
  const themePrompt = createGradientText("Choose a gradient theme (1: Red/Orange, 2: Blue/Cyan, 3: Purple/Pink): ", ['#ff5f6d', '#ffc371']);
  const themeChoice = await getUserInput(themePrompt);

  let gradientColors;
  switch (themeChoice) {
    case '1':
      gradientColors = ['#ff5f6d', '#ffc371'];
      break;
    case '2':
      gradientColors = ['#00c6ff', '#0072ff'];
      break;
    case '3':
      gradientColors = ['#8E2DE2', '#4A00E0'];
      break;
    default:
      gradientColors = ['#ff5f6d', '#ffc371'];
  }

  // Get WhatsApp number
  const promptMessage = createGradientText("Input your victim's WhatsApp number with '+' and country code after '+'", gradientColors);
  clearAndDisplay(promptMessage);
  const username = await getUserInput('');

  // Get number of reports
  const reportCountPrompt = createGradientText("How many reports do you want to send? ", gradientColors);
  const reportCount = await getUserInput(reportCountPrompt);

  // Countdown before starting
  await countdown(3);

  // Start sending reports
  clearAndDisplay('');
  const logMessage = `Reports sending by @UMG Team to WhatsApp number @${username}`;
  const gradientLogMessage = createGradientText(logMessage, gradientColors);
  clearAndDisplay(gradientLogMessage);

  progressBar.start(reportCount, 0);

  for (let i = 1; i <= reportCount; i++) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    progressBar.update(i);
    clearAndDisplay(createGradientText(getRandomMessage(), gradientColors));
  }

  progressBar.stop();
  clearAndDisplay(createGradientText(`All ${reportCount} reports sent successfully!`, gradientColors));

  // Exit the program
  process.exit(0);
};

main();