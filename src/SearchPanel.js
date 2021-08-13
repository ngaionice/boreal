import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchPanel = () => {
  const [term, setTerm] = useState("");
  const [year, setYear] = useState("");
  const [results, setResults] = useState({});

  useEffect(() => {
    const search = async () => {
      const url = `https://still-everglades-98735.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/${year}/courses?code=${term}`;
      const { data } = await axios.get(url, { headers: {} });

      setResults(data);
    };

    if (term && year && !results) {
      search();
    } else {
      const timerId = setTimeout(() => {
        if (term && year) {
          search();
        }
      }, 500);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [term, year, results]);

  const renderedResults = Object.keys(results).map((key) => {
    const result = results[key];
    return (
      <div>
        <div key={result.courseId}>{result.courseTitle}</div>
      </div>
    );
  });

  return (
    <div>
      <div>
        <div>
          <label>Enter Year</label>
          <input value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div>
          <label>Enter course code</label>
          <input value={term} onChange={(e) => setTerm(e.target.value)} />
        </div>
        <div>{renderedResults}</div>
      </div>
    </div>
  );
};

export default SearchPanel;
