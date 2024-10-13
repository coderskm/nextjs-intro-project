import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";
import { useRouter } from "next/router";
import Head from "next/head";

function MeetupDetails(props) {
    const router = useRouter();
    return (
      <>
        <Head>
          <title>{props.meetupData.title}</title>
          <meta name="description" content="Add your own meetups around react" />
        </Head>
        <MeetupDetail
          image={props.meetupData.image}
          title={props.meetupData.title}
          address={props.meetupData.address}
          description={props.meetupData.description}
        />
      </>
    );
}

export async function getStaticPaths() {
      const client = await MongoClient.connect(
        "mongodb+srv://sumitmishraskm21:RA8e9cr1jmDTdl63@nextjs-intro-project.kix10.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupCollection = db.collection("meetups");
      const meetups = await meetupCollection.find({},{projection:{_id:1}}).toArray();
      await client.close();
    return {
        fallback:false,
        paths: meetups.map((meetup) => ({
          params:{meetupid:meetup._id.toString()}
      }))
    };
}

export async function getStaticProps(context) {
    const meetupid = context.params.meetupid;
    const client =await MongoClient.connect(
      "mongodb+srv://sumitmishraskm21:RA8e9cr1jmDTdl63@nextjs-intro-project.kix10.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const selectedMeetup = await meetupCollection.findOne( { _id: new ObjectId(meetupid) });
    
    (await client).close();
    if (!selectedMeetup) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
            meetupData: {
              id: selectedMeetup._id.toString(),
              title: selectedMeetup.title,
              address:selectedMeetup.address,
              image: selectedMeetup.image,
              description:selectedMeetup.description  
        }
      },
    };
}

export default MeetupDetails;