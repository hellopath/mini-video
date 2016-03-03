# A mini video wrapper with an event manager

```
import miniVideo from 'mini-video'
var mVideo = miniVideo({
	autoplay: false,
	loop: true,
	volume: 1
})
mVideo.addTo(myDomElement)
mVideo.load(videoSrc, callback)

// Methods
play()
play(10) play on specific time
pause()
pause(10) pause on specific time
seek()
volume() get and set
currentTime() get and set
width()
height()

// Add-Remove Events
mVideo.on('ended', callback)
mVideo.off('ended', callback)

// Clear all events and destroy everything
mVideo.clear()

```
