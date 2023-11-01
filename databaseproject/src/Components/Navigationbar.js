const Navigationbar = () => {
    return(
        <>
        <div className="sticky top-0 ">
            <div className="container mx-auto">
                <div className="">
                    <div className="grid grid-cols-3" >
                        <div className="col-span-2">navigation bar</div>
                        <div className=""><a href="/profile">User profile</a><br/><a href="/manageshop">Shop profile</a></div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <h2 style={{backgroundColor: "lightgreen"}}>Banner</h2>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
};
export default Navigationbar;