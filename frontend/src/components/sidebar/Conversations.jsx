import useGetConversations from "../../hooks/useGetConversations";

import { UserSkeleton } from "../skeletons/UserSkeleton";
// import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          // emoji={getRandomEmoji()}
          lastIndex={index === conversations.length - 1}
        />
      ))}
      {/* {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null} */}
      {loading && [...Array(5)].map((_, idx) => <UserSkeleton key={idx} />)}
    </div>
  );
};

export default Conversations;


