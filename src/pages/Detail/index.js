import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";

function Detail() {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { char_id } = useParams();

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/character/${char_id}`)
      .then((res) => res.data)
      .then((data) => setChar(data[0]))
      .finally(setLoading(false));
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {char && (
        <div>
          <h1>{char.name} {char.alternate_names[0] && `(${char.alternate_names})`}</h1>
          <img src={char.image} alt="" style={{ width: "50%" }} />
          <pre>{JSON.stringify(char, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Detail;
