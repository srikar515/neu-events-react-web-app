import React from "react";
import { Link } from "react-router-dom";

const Home = props => {
  const users = [{ id: 1, name: "john" }, { id: 2, name: "charles" }];

  return (
    <div>
      {users.map(user => {
        return (
          <div key={user.id}>
            {user.name}
            <Link
              to={{
                pathname: `/view-contact-details/${user.id}`,
                state: { users: user }
              }}
            >
              <button>View</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
