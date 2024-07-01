function Header() {
    return (
        <header className="app-header">
            <div
                style={{
                    height: "10rem",
                    widh: "10rem",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    style={{ height: "32rem", width: "32rem" }}
                    src="main-logo-white-transparent.svg"
                    alt="React logo"
                />
            </div>
            <h1>The Quiz app</h1>
        </header>
    );
}

export default Header;
