# Random Joke Generator

A fun and interactive random joke generator that fetches jokes from the [JokeAPI](https://jokeapi.dev/).

## Features

- 🎭 Fetches random jokes from an external API (JokeAPI)
- 😂 Supports both single-part and two-part (setup/delivery) jokes
- 🎨 Beautiful and responsive UI with gradient design
- 📱 Mobile-friendly interface
- 🔄 Easy-to-use button to fetch new jokes
- 📤 Share jokes via Web Share API or copy to clipboard
- ⚡ Loading state feedback

## Project Structure

```
src/
├── joke-generator.html    # Main HTML file
├── app.js                 # Application logic and UI handling
├── jokeGenerator.js       # Joke fetching utility (can be used as module)
└── styles.css            # Styling for the joke generator
```

## How to Use

1. **Open the application**: Open `src/joke-generator.html` in your web browser
2. **Get a joke**: Click the "Get a Joke" button
3. **Share a joke**: Click the "Share Joke" button to share via native share or copy to clipboard

## API Used

This project uses the [JokeAPI v2](https://jokeapi.dev/) - A REST API that serves random jokes.

### API Endpoint
```
https://v2.jokeapi.dev/joke/Any
```

### Sample Response
```json
{
  "type": "twopart",
  "setup": "Why don't scientists trust atoms?",
  "delivery": "Because they make up everything!",
  "category": "General"
}
```

## Features Breakdown

### 1. Joke Fetching (`jokeGenerator.js`)
- Async function to fetch jokes from the JokeAPI
- Error handling for network issues
- Automatic formatting for different joke types

### 2. UI Interaction (`app.js`)
- Button event listeners for fetching and sharing jokes
- Loading state management
- Native Web Share API with fallback to clipboard
- Auto-load a joke when page loads

### 3. Responsive Design (`styles.css`)
- Gradient background
- Mobile-responsive layout
- Smooth animations and transitions
- Accessible button states

## Browser Compatibility

- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Mobile browsers

## Error Handling

- Network errors are caught and display a user-friendly message
- API errors trigger a retry prompt
- Loading states prevent multiple simultaneous requests

## Extension Ideas

- Add category filter (Programming, Knock-knock, Dark, etc.)
- Save favorite jokes to localStorage
- Dark mode toggle
- Joke history
- Rate jokes with emoji reactions
- Multiple language support

## License

This project is open source and available under the MIT License.
