export default function Hamburger({ isOpen }){
    return(
        <>
            <div className="hamburger">
                <div className="burger burger1" />
                <div className="burger burger2" />
                <div className="burger burger3" />
            </div>

            <style jsx>{`
                .hamburger{
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    justify-content: space-around;
                    flex-flow: column nowrap;
                    z-index: 10;
                    margin-right:50px;
                    margin-bottom: 50px;
                }

                .burger{
                    width: 3.5rem;
                    height: 1rem;
                    border-radius: 10px;
                    background-color: black;
                    transform-origin: 1px;
                    transition: all 0.3s linear;
                    margin-bottom: 5px;
                }

                .burger1{
                    transform: ${ isOpen ? 'rotate(50deg)' : 'rotate(0)'};
                }
                .burger2{
                    transform: ${ isOpen ? 'translateX(100%)' : 'translateX(0)'};
                    opacity: ${ isOpen ? 0 : 1};
                }
                .burger3{
                    transform: ${ isOpen ? 'rotate(-50deg)' : 'rotate(0)'};
                }

                
            `}</style>
        </>
    )
}