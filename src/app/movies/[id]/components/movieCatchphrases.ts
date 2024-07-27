const movieNotFoundCatchphrases = [
  "Houston, we have a problem. Movie not found!",
  "To infinity and beyond... but no movie here!",
  "Frankly, my dear, the movie doesn't exist.",
  "May the force be with you... in finding the right movie!",
  "You can't handle the truth! The movie is missing.",
  "I've got a feeling we're not in Kansas anymore... and there's no movie.",
  "Here's looking at you, kid. But no movie found.",
  "I'll be back... with better search results.",
  "Why so serious? Let's try searching again!",
  "Nobody puts Baby in a corner... or finds this movie.",
  "Elementary, my dear Watson, the movie is missing.",
  "I see dead people... but no movies.",
  "You talkin' to me? There's no movie here.",
  "I'm the king of the world... but there's no movie.",
  "Say hello to my little friend... the missing movie.",
  "E.T. phone home... and ask about the missing movie.",
  "Here's Johnny! But no movie.",
  "Hasta la vista, baby. No movie found.",
  "Just keep swimming... and searching for the movie.",
  "Life is like a box of chocolates... sometimes there's no movie.",
  "You had me at hello... but not at finding this movie.",
  "They're here... but the movie isn't.",
  "Good morning, Vietnam! But no movie here.",
  "Roads? Where we're going, we don't need roads... but we do need a movie.",
  "I'm mad as hell, and I'm not going to take this anymore! Where's the movie?",
];

export default function getMovieCatchphrase() {
  const randomIndex = Math.floor(
    Math.random() * movieNotFoundCatchphrases.length
  );
  return movieNotFoundCatchphrases[randomIndex];
}
