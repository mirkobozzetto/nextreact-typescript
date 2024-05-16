import { useRef } from "react";

const UserNameForm = () => {
  const onSubmit = () => {};
  const userXRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="user1">User X</label>
      <input id="user1" ref={userXRef} required minLength={2} />
      <label htmlFor="user2">User O</label>
      <input id="user2" ref={userORef} required minLength={2} />
      <button type="submit">Submit</button>
    </form>
  );
};
