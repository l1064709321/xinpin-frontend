/**
 * Random Joke Generator
 * Uses the JokeAPI to fetch random jokes
 */

const jokeGenerator = {
  apiUrl: 'https://v2.jokeapi.dev/joke/Any',

  /**
   * Fetch a random joke from the API
   * @returns {Promise<string>} The joke text
   */
  async getJoke() {
    try {
      const response = await fetch(this.apiUrl);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      // Handle two-part jokes (setup + delivery)
      if (data.type === 'twopart') {
        return `${data.setup}\n\n${data.delivery}`;
      }

      // Handle single-part jokes
      return data.joke;
    } catch (error) {
      console.error('Error fetching joke:', error);
      return 'Sorry, I couldn\'t fetch a joke right now. Please try again later!';
    }
  },

  /**
   * Fetch a joke and display it
   */
  async displayJoke() {
    const joke = await this.getJoke();
    console.log(joke);
    return joke;
  }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = jokeGenerator;
}
