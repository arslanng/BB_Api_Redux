import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  errorSelector,
  fetchAllQuotes,
  quotesSelector,
  statusSelector,
} from "../../redux/quotesSlice";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import Item from "./item";

function Quotes() {
  const dispatch = useDispatch();
  const data = useSelector(quotesSelector);
  const status = useSelector(statusSelector);
  const error = useSelector(errorSelector);
  const page = useSelector((state) => state.quotes.page);
  const hasNextPage = useSelector((state) => state.quotes.hasNextPage)

  useEffect(() => {
    if (status === "idle") {
      // sayfanın her seferinde fetch edilmesini engeller.
      dispatch(fetchAllQuotes(1));
    }
  }, [dispatch, status]);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Quotes</h1>

      {status === "succeeded" &&
        data.map((item) => <Item key={item._id} item={item} />)}

      <div style={{ padding: "20px 0 40px 0", textAlign: "center" }}>
        {status === "loading" && <Loading />}
        {hasNextPage && status !== "loading" && (
          <button onClick={() => dispatch(fetchAllQuotes(page))}>
            Load More ({page})
          </button>
        )}
        {!hasNextPage && <div>There is nothing to be shown.</div>}
      </div>
    </div>
  );
}

export default Quotes;
