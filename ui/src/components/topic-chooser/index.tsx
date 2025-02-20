import "./style.css";

interface Props {
  allTopics: string[];
  selectedTopics: Set<string>;

  onChange: (_: string) => void;
}

export default function TopicChooser({
  allTopics,
  onChange,
  selectedTopics,
}: Props) {
  return (
    <form className="topic-chooser">
      {allTopics.map((topic) => (
        <label key={topic}>
          <input
            type="checkbox"
            checked={selectedTopics.has(topic)}
            onChange={() => onChange(topic)}
          />
          {topic}
        </label>
      ))}
    </form>
  );
}
