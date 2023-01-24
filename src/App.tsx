import { useState } from "react";
import "./App.css";
import axios from "axios";
import Footer from "./Footer";

const App = () => {
  const [username, setUsername] = useState("");
  const [isFound, setIsFound] = useState(false);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({
    avatar_url: "",
    bio: "",
    followers: "",
    following: "",
    profile_link: "",
    public_repos: "",
    public_gists: "",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(username);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    setIsFound(true);
    setUser({
      avatar_url: res.data.avatar_url,
      bio: res.data.bio,
      followers: res.data.followers,
      following: res.data.following,
      profile_link: res.data.html_url,
      public_repos: res.data.public_repos,
      public_gists: res.data.public_gists,
    });
    const repos = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    setRepos(repos.data);
  };
  return (
    <>
      <h1 className="text-center text-3xl py-5 bg-blue-300 font-mono ">
        GitHub Profile Finder
      </h1>
      <div className="flex justify-center items-center">
        <input
          type="text"
          className="border-2 border-blue-300 rounded-md p-2 m-2"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
            )
          } // Capitalize first letter
        />
        <button className="bg-blue-300 p-2 rounded-md" onClick={onSubmit}>
          Search
        </button>
      </div>
      {isFound && (
        <>
          <div className="border-2 flex flex-col justify-center items-center w-1/2 mx-auto my-5">
            <img
              src={user.avatar_url}
              alt="avatar"
              className="w-1/2 my-3 rounded-full pointer-events-none"
            />
            <a
              href={user.profile_link}
              className="bg-blue-400 text-white p-2 rounded my-2"
            >
              View {username} Profile
            </a>
            <div className="flex gap-5 my-8">
              <a
                href={user.profile_link}
                className="bg-sky-600 text-white px-2 py-1 rounded my-2"
              >
                Public Repos: {user.public_repos}
              </a>
              <a
                href={user.profile_link}
                className="bg-red-400 text-white px-2 py-1 rounded my-2"
              >
                Public Gists: {user.public_gists}
              </a>
              <a
                href={user.profile_link}
                className="bg-blue-400 text-white px-2 py-1 rounded my-2"
              >
                Followers: {user.followers}
              </a>
              <a
                href={user.profile_link}
                className="bg-blue-400 text-white px-2 py-1 rounded my-2"
              >
                Following: {user.following}
              </a>
            </div>
          </div>
          <div className="border-2 flex flex-col justify-center w-1/2 mx-auto my-10">
            {/* Latest Repos */}
            <h1 className="text-3xl font-sans mx-5">Latest Repostorties</h1>
            <div className="flex flex-col justify-center gap-5 m-5">
              {repos.map((repo: any) => {
                return (
                  <div
                    className="flex justify-between border-2 p-2 rounded-md"
                    key={repo.url}
                  >
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="my-auto font-semibold"
                    >
                      {repo.name}
                    </a>
                    <div className="flex gap-10">
                      <span className="bg-blue-300 px-4 py-1 rounded">
                        <a href={repo.homepage}>
                          Deployments
                          {repo.homepage !== null ? "✅" : "❌"}
                        </a>
                      </span>
                      <a
                        href={repo.url}
                        className="bg-red-300 px-4 py-1 rounded"
                      >
                        GitHub Repository
                      </a>
                      <span className="bg-yellow-300 px-4 py-1 rounded">
                        Forks: {repo.forks}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
