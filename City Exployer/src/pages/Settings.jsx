import { useState, useEffect } from "react";
import {
    applyTheme,
    getSavedTheme,
} from "../utils/theme";

const themeOptions = ["light", "dark", "system"];
const Settings = () => {
    const [selectedTheme, setSelectedTheme] = useState(getSavedTheme());

    useEffect(() => {
        applyTheme(getSavedTheme());
    }, []);

    const handleApply = () => {
        localStorage.setItem("theme", selectedTheme);
        applyTheme(selectedTheme);
    };

    return (

        <main className="page">

           <section className="settings">
                <h2>Settings</h2>

                <div className="settings-card">
                    <h3>Themes</h3>

                    <div className="theme-options">
                        {themeOptions.map((theme) => (
                            <label className="radio" key={theme}>
                                <input
                                    type="radio"
                                    name="theme"
                                    value={theme}
                                    checked={selectedTheme === theme}
                                    onChange={() => setSelectedTheme(theme)}
                                />
                                <span>{theme}</span>
                            </label>
                        ))}
                    </div>

                    <button className="apply-btn" onClick={handleApply}>
                        Apply
                    </button>
                </div>

            </section>

        </main>

    );

};

export default Settings;
