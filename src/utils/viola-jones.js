import "tracking/build/tracking-min";
import "tracking/build/data/face-min";

const detect = selector =>
    new Promise(resolve => {
        const { tracking } = window;
        const tracker = new tracking.ObjectTracker(["face"]);
        tracker.on("track", event => resolve({ detected: event.data.length > 0 }));
        tracking.track(selector, tracker);
    });

export { detect };
