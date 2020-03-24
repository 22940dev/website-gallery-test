import fetch from "isomorphic-unfetch";

const Index = ({ websites }) => (
  <div
    style={{
      color: `var(--primary-headline)`
    }}
  >
    <h1>MONICA*S INSPIRATION GALLERY</h1>
    <p style={{ color: `var(--accent)` }}>
      a collection of sites around the world wide web 🌏 that have inspired
      me...
    </p>
    <div id="flexContainer">
      {websites.length > 0 &&
        websites.map(({ name, address, colors, photo }, i) => (
          <div className="websiteCard" key={`${name}-card`}>
            <div key={name} className="title">
              {" "}
              {name}
            </div>

            <div key={i}>
              <a href={address}>
                {address}

                <div
                  style={{
                    backgroundColor: `var(--grey)`,
                    textAlign: `left`,
                    marginTop: `1em`
                  }}
                >
                  {colors &&
                    colors.sort().map(color => (
                      <div
                        style={{
                          backgroundColor: color,
                          display: `inline-block`,
                          borderRadius: `50%`,
                          width: `15px`,
                          height: `15px`,
                          margin: `.5em`
                        }}
                      >
                        {" "}
                        &nbsp;
                      </div>
                    ))}
                </div>

                <img src={photo} alt={name} />
              </a>
            </div>
          </div>
        ))}
      <style jsx>{`
        #flexContainer {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        .title {
          font-weight: bold;
          font-size: 1.5em;
          color: var(--secondary-headline);
        }
        .websiteCard {
          width: 25%;
          padding: 1em;
          margin: 20px;
          background-color: var(--light-background);
          border: 5mm ridge transparent;
        }

        .websiteCard:nth-child(odd):hover {
          border: 5mm ridge var(--accent);
        }
        .websiteCard:nth-child(even):hover {
          border: 5mm ridge var(--secondary-headline);
        }
        ,
        img {
          width: 100%;
        }

        a {
          text-decoration: none;
          color: var(--accent);
          font-size: 1.2em;
        }

        a:hover {
          opacity: 0.6;
        }
        @media (max-width: 992px) {
          .websiteCard {
            width: 40%;
          }
        }
        @media (max-width: 768px) {
          #flexContainer {
            flex-direction: column;
            justify-content: center;
          }
          .websiteCard {
            width: 90%;
          }
        }
      `}</style>
    </div>
  </div>
);

export async function getServerSideProps({ req }) {
  const protocol = req.protocol ? req.protocol : `http`;
  const base_url = `${protocol}://${req.headers.host}`;

  const response = await fetch(`${base_url}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      query: "{ websites { name, address, photo, colors } }"
    })
  });

  const {
    data: { websites }
  } = await response.json();

  return { props: { websites } };
}

export default Index;
