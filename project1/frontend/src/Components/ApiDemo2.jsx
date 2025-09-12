import React, { useState, useEffect } from 'react';

const ApiDemo2 = () => {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        fetch('https://t3-reva.t3planet.de/')
            .then((res) => res.json())
            .then((data) => {
                setPageData(data);
                // if (data?.content) {
                //     const found = data.i18n.find(item => item.id === 207);
                //     console.log('Found i18n item:', found);
                // } else {
                //     console.log('No i18n data found');
                // }

                function findById(obj, id) {
                    let result = null;

                    //  Search By Id
                    function search(o) {
                        if (typeof o !== 'object' || o === null) return;

                        for (let key in o) {
                            if (key === 'id' && o[key] === id) {
                                result = o;
                                return; // Stop once found
                            }

                            if (typeof o[key] === 'object') {
                                search(o[key]);
                                if (result) return; // Stop if found
                            }
                        }
                    }

                    search(obj);
                    return result;
                }

                // Usage:
                const foundData = findById(data, 755); // Replace 123 with your ID
                console.log(foundData);

                console.log(foundData?.content?.bodytext);
                

                //  Search BY Body Text
                function searchForKeyword(obj, keyword) {
                    let found = [];

                    function recursive(o) {
                        for (let key in o) {
                            if (typeof o[key] === 'string' && o[key].toLowerCase().includes(keyword.toLowerCase())) {
                                found.push({ key, value: o[key] });
                            } else if (typeof o[key] === 'object' && o[key] !== null) {
                                recursive(o[key]);
                            }
                        }
                    }

                    recursive(obj);
                    return found;
                }

                // Usage:
                const tataMatches = searchForKeyword(data, 'Easy');
                console.log(tataMatches);
            })
            .catch((err) => console.error(err));
    }, []); // Empty dependency array → runs once on mount

    return (
        <div className="p-4">
            {!pageData ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-4">API Response:</h2>
                    <div>
                        <h3 className="font-semibold">Meta Data:</h3>
                        <ul>
                            {Object.keys(pageData).map((key) => (
                                <li key={key}>
                                    <strong>{key}</strong>: {JSON.stringify(pageData[key])}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default ApiDemo2;
