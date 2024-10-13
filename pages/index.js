import Head from "next/head";

import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>react meetups</title>
        <meta name="description" content="react meetups around the world"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://sumitmishraskm21:RA8e9cr1jmDTdl63@nextjs-intro-project.kix10.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups:DUMMY_MEETUPS
//     },
//   }
// }
export default HomePage;
