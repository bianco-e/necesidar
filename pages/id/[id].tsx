import type { NextPage } from "next";
import Cards from "../../components/Cards";
import CardSingleView from "../../components/CardSingleView";
import mocked_publications from "../../mocked_publications.json";

const Id: NextPage = () => {
  return (
    <>
      <CardSingleView data={mocked_publications[3]} />
      <Cards
        publicationsData={mocked_publications
          .filter((p) => !p.is_urgent)
          .slice(0, 3)}
        title="Otras donaciones similares"
      />
    </>
  );
};

export default Id;
