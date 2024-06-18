import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";

const TextReveal = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(displayedText + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, displayedText, speed]);

  return <p>{displayedText}</p>;
};

const QueryForm = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [key, setKey] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const askquery = { query };
    if (!user) {
      toast.error("You must be logged in to ask any query.");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/api/routes/ask`,
      {
        method: "POST",
        body: JSON.stringify(askquery),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError("Fill all the fields");
    }
    if (response.ok) {
      setQuery("");
      setError(null);
      let responseObject = JSON.stringify(json);
      let answerString = JSON.parse(responseObject).answer;
      setAnswer(answerString);
      setKey(prevKey => prevKey + 1); 
    }
  };

  return (
    <>
      <Navbar />
      <form className="ask" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="ask your question.."
        />
        <button>Ask</button>
        <Toaster />
        {answer && <TextReveal text={answer} speed={50} key={key} />}
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default QueryForm;
