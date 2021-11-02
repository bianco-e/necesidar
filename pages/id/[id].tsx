import type { GetStaticPaths, NextPage, NextPageContext } from "next";
import Cards from "../../components/Cards";
import CardSingleView from "../../components/CardSingleView";
import { getPublicationById, getAllPublicationsIds } from "../../database";
import { PublicationData } from "../../interfaces";

interface IProps {
  currentPublication: PublicationData;
  similarPublications?: PublicationData[];
}

interface MyPageContext extends NextPageContext {
  params: { id: string };
}

const Id: NextPage<IProps> = ({ currentPublication, similarPublications }) => {
  return (
    <>
      <CardSingleView data={currentPublication} />
      <Cards
        publicationsData={similarPublications}
        title="Otras donaciones similares"
      />
    </>
  );
};

export const getStaticProps = async ({ params }: MyPageContext) => {
  try {
    const currentPublication = await getPublicationById(params.id);
    return {
      props: { currentPublication, similarPublications: [] },
      revalidate: 120,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        currentPublication: null,
        similarPublications: null,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const ids = await getAllPublicationsIds();
    const paths = ids
      ? ids.map(({ id }: { id: number }) => ({
          params: { id: id.toString() },
        }))
      : [];
    return {
      paths,
      fallback: false,
    };
  } catch (e) {
    console.error(e);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export default Id;
