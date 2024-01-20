import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";

const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);

  const messagesColumnRef = useRef(null);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          messageContent: data.messageContent,
          sentBy: data.sentBy,
          sentAt: data.sentAt,
          roomName: data.roomName,
          _id: data._id,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on("fetch_messages", (Messages) => {
      setMessagesReceived((state) => [...Messages, ...state]);
    });

    return () => socket.off("fetch_messages");
  }, [socket]);

  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={styles.msgMeta}>{msg.sentBy}</span>
            <span className={styles.msgMeta}>{msg.sentAt}</span>
          </div>
          <p className={styles.msgText}>{msg.messageContent}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;
