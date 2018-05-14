export default (props) => {

  var scope
  var video = document.createElement('video')
  video.preload = ""
  var source = document.createElement('source')
  var onReadyCallback
  var size = { width: 0, height: 0 }
  var eListeners = []

  var onCanPlay = () => {
    scope.isLoaded = true
    if (props.autoplay) video.play()
    if (props.volume !== undefined) video.volume = props.volume
    size.width = video.videoWidth
    size.height = video.videoHeight
    video.removeEventListener('canplay', onCanPlay);
    video.removeEventListener('canplaythrough', onCanPlay);
    onReadyCallback(scope)
  }

  var play = (time) => {
    if (time !== undefined) {
      scope.seek(time)
    }
    scope.isPlaying = true
    video.pause() 
    return video.play()
  }

  var seek = (time) => {
    try {
      video.currentTime = time
    }
    catch (err) {
    }
  }

  var pause = (time) => {
    video.pause()
    if (time !== undefined) {
      scope.seek(time)
    }
    scope.isPlaying = false
  }

  var volume = (val) => {
    if (val) {
      scope.el.volume = val
    } else {
      return scope.el.volume
    }
  }

  var currentTime = (val) => {
    if (val) {
      scope.el.currentTime = val
    } else {
      return scope.el.currentTime
    }
  }

  var width = () => {
    return scope.el.videoWidth
  }

  var height = () => {
    return scope.el.videoHeight
  }

  var ended = () => {
    if (props.loop) play()
  }

  var addTo = (p) => {
    scope.parent = p
    scope.parent.appendChild(video)
  }

  var on = (event, cb) => {
    eListeners.push({ event: event, cb: cb })
    video.addEventListener(event, cb)
  }

  var off = (event, cb) => {
    for (var i in eListeners) {
      var e = eListeners[i]
      if (e.event === event && e.cb === cb) {
        eListeners.splice(i, 1)
      }
    }
    video.removeEventListener(event, cb)
  }

  var clearAllEvents = () => {
    for (var i in eListeners) {
      var e = eListeners[i]
      video.removeEventListener(e.event, e.cb);
    }
    eListeners.length = 0
    eListeners = null
  }

  var reset = () => {
    video.removeEventListener('canplay', onCanPlay);
    video.removeEventListener('canplaythrough', onCanPlay);
    video.removeEventListener('ended', ended);
    scope.clearAllEvents()
    eListeners = []
    scope.isLoaded = false;
  }

  var clear = () => {
    scope.reset()
    size = null
    video = null
  }

  var addSourceToVideo = (src, type) => {
    source.setAttribute('src', src)
    source.setAttribute('type', type)
    video.appendChild(source)
  }

  var changeVideoSource = (src, type) => {
    if (scope.isPlaying) video.pause()
    source.setAttribute('src', src)
    source.setAttribute('type', type)
    video.load()
    scope.addEventsListeners()
  }

  var addEventsListeners = () => {
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('canplaythrough', onCanPlay);
    video.addEventListener('ended', ended);
  }

  addEventsListeners()


  scope = {
    parent: undefined,
    el: video,
    size: size,
    play: play,
    seek: seek,
    pause: pause,
    volume: volume,
    currentTime: currentTime,
    addEventsListeners: addEventsListeners,
    width: width,
    height: height,
    addTo: addTo,
    changeVideoSource: changeVideoSource,
    on: on,
    off: off,
    reset: reset,
    clear: clear,
    clearAllEvents: clearAllEvents,
    isPlaying: props.autoplay || false,
    isLoaded: false,
    load: (src, callback) => {
      onReadyCallback = callback
      addSourceToVideo(src, 'video/mp4')
    },
    changeVideo: (src, callback) => {
      onReadyCallback = callback
      changeVideoSource(src, 'video/mp4')
    }
  }

  return scope

}