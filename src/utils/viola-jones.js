import "tracking/build/tracking-min";
import "tracking/build/data/face-min";

const detect = (selector) => {
    const { tracking } = window;
    const tracker = new tracking.ObjectTracker(["face"]);
    tracker.on("track", event => {
        event.data.forEach(rect => {
            console.log(rect);
        });
        console.timeEnd();
    });
    tracking.track(selector, tracker);
    console.time();
};

export { detect };