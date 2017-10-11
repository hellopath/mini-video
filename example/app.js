import miniVideo from '../src/index.js'

const VIDEO_EL = document.createElement( 'video' )

const videos = [
  'https://static.videezy.com/system/resources/previews/000/005/072/original/Galaxy_Storm_4K_Motion_Background_Loop.mp4',
  'https://static.videezy.com/system/resources/previews/000/005/102/original/Starscape_4K_Motion_Background_Loop.mp4'
]

const mVideo = new miniVideo({
  autoplay: true,
  loop: false,
  volume: 0
})

const onVideoReady = () => {
  console.log( mVideo.el.duration, mVideo.size )
}

const nextVideoReady = () => {
  VIDEO_EL.removeEventListener( 'canplay', nextVideoReady )
  VIDEO_EL.removeEventListener( 'canplaythrough', nextVideoReady )
  mVideo.reset()
  mVideo.changeVideo( videos[ 1 ], onVideoReady )
}

const preloadVideo = ( path ) => {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if ( xhr.readyState === 4 && xhr.status === 200 ) {
      const blob = xhr.response
      VIDEO_EL.addEventListener( 'canplay', nextVideoReady )
      VIDEO_EL.addEventListener( 'canplaythrough', nextVideoReady )
      VIDEO_EL.src = window.URL.createObjectURL( blob )
      if ( VIDEO_EL.readyState > 3 ) nextVideoReady()
    }
  }
  xhr.open( 'GET', path )
  xhr.responseType = 'blob'
  xhr.send()
}

const init = () => {
  mVideo.addTo( document.querySelector( '.container' ) )
  mVideo.load( videos[ 0 ], onVideoReady )
  preloadVideo( videos[ 1 ] )
}

init()
