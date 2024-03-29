import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function QuoteDetail() {
  const { quote_id } = useParams();
  const [quote, setQuote] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios(`https://api.quotable.io/quotes/${quote_id}`)
      .then((res) => res.data)
      .then((data) => setQuote(data))
      .finally(setIsLoading(false));
  }, [quote_id]);
  return (
    <div>
      <h1>Quote Detail</h1>
      {isLoading ? <Loading /> : <pre>{JSON.stringify(quote, null, 2)}</pre>}
    </div>
  );
}

export default QuoteDetail;
