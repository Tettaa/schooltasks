import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, 
    import.meta.env.VITE_SUPABASE_KEY
,{  db: {
    schema: 'public',
  }});

function School() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("words").select();
    setWords(data);
  }

  return (
    <ul>
      {words.map((w) => (
        <li key={w.article}>{w.word}</li>
      ))}
    </ul>
  );
}

export default School;