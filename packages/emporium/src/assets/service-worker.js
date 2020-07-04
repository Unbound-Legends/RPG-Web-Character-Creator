self.addEventListener('activate', event => {
    // Delete all of our old caches
    const cacheWhitelist = [];
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(
                keyList.map(key => {
                    if (!cacheWhitelist.includes(key)) {
                        console.log('Deleting cache: ' + key);
                        return caches.delete(key);
                    }

                    return null;
                })
            )
        )
    );
});
