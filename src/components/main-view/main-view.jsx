import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "Harry Potter and the Sorcerer's Stone",
      Genre: {
        Name: "Fantasy",
        Description:
          "Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and usually inspired by mythology and folklore. ",
      },
      Director: {
        Name: "Chris Columbus",
        Born: "1958 - 09 - 10",
        Bio:
          "An American filmmaker. Born in Spangler, Pennsylvania, Columbus. studied film at Tisch School of the Arts ",
      },
      Description:
        "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
      ImageURL:
        "https://upload.wikimedia.org/wikipedia/en/7/7a/Harry_Potter_and_the_Philosopher%27s_Stone_banner.jpg",
      Featured: true,
    },
    {
      id: 2,
      Title: "Spider-Man: Across the Spider-Verse",
      Genre: {
        Name: "Animation",
        Description:
          "Animation is the process used for digitally generating animations.",
      },
      Director: {
        Name: "Joaquim Dos",
        Born: "1977 - 07 - 22",
        Bio:
          "An American animator, storyboard artist, director, producer, and writer ",
      },
      Description:
        "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
      ImageURL:
        "https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg",
      Featured: true,
    },
    {
      id: 3,
      Title: "Inception",
      Genre: {
        Name: "sci-fi",
        Description:
          "sci-fi is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.",
      },
      Director: {
        Name: "Christopher Nolan",
        Born: "1970 - 07 - 30",
        Bio:
          " A British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling. ",
      },
      Description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
      ImageURL:
        "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
      Featured: true,
    },
    {
      id: 4,
      Title: "Avengers: Infinity War",
      Genre: {
        Name: "Action",
        Description:
          "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
      },
      Director: {
        Name: "Anthony Russo",
        Born: "1970 - 02 - 03",
        Bio: "An American director, producer, and screenwriter. ",
      },
      Description:
        "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
      ImageURL:
        "https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg",
      Featured: true,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  }
};
