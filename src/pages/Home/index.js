import { useEffect } from "react";
import Masonry from "react-masonry-css";

import Loading from "../../components/Loading";
import Error from "../../components/Error";

import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../../redux/charactersSlice";

import { Link } from "react-router-dom";

function Home() {
  const characters = useSelector((state) => state.characters.items);
  const page = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters(0));
    }
  }, [dispatch, status]);

  if (status === "failed") {
    return <Error message={error} />;
  }

  return (
    <div>
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {characters.map((character) => (
          <div key={character.id}>
            <Link to={`/char/${character.id}`}>
              <img
                src={
                  character.image
                    ? character.image
                    : "https://cdn.evrimagaci.org/zZKA_7o0hzCnltHvAhIaB9yWllk=/300x0/filters:format(webp)/evrimagaci.org%2Fpublic%2Fmi_media%2F1ffc457d5cd451f726f9287682746838.jpeg"
                }
                alt={character.name}
                className="character"
              />
              <div className="char_name">{character.name}</div>
            </Link>
          </div>
        ))}
      </Masonry>

      <div style={{ padding: "20px 0 40px 0", textAlign: "center" }}>
        {status === "loading" && <Loading />}
        {hasNextPage && status !== "loading" && (
          <button onClick={() => dispatch(fetchCharacters(page))}>
            Load More ({page})
          </button>
        )}
        {!hasNextPage && <div>There is nothing to be shown.</div>}
      </div>
    </div>
  );
}

export default Home;
