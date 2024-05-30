import React from "react";

function Header() {
  return (
    <>
      <header>
        <article className="bg-darkBlue w-full h-16 flex justify-between items-center px-4 md:px-20">
          {" "}
          <section>
            <h1 className="text-whiteL&D font-nunito font-bold text-sm md:text-xl">
              Where in the world?
            </h1>
          </section>
          <section>
            <div className="text-whiteL&D font-nunito font-light text-xs md:text-m flex fill-white ">
              <svg

             className="w-3 md:w-4 mx-2"
                viewBox="0 0 35 35"
                data-name="Layer 2"
                id="Layer_2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z" />
              </svg>{" "}
             <p> Dark Mode</p>
            </div>
          </section>
        </article>
      </header>
    </>
  );
}

export default Header;
