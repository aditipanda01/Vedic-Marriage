import { useEffect, useRef } from "react"
import testHtml from "./test.html?raw"

type Props = {
  height?: number | string
  className?: string
  topPaddingPx?: number
  autoHeight?: boolean
}

export default function EmbeddedArchSliderTest({ 
  height = 600, 
  className = "", 
  topPaddingPx = 0, 
  autoHeight = false 
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    
    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (!doc) return
    
    doc.open()
    
    // Create a modified version of the HTML with proper centering
    let modifiedHtml = testHtml
    
    // Add CSS to ensure proper centering and prevent conflicts
    modifiedHtml = modifiedHtml.replace(
      /<head>/i,
      `<head>
        <base target="_blank">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            width: 100%;
            height: 100%;
          }
          body {
            padding-top: ${topPaddingPx}px !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .pin-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .animation-container {
            width: 100%;
            display: flex;
            justify-content: center;
          }
          #s2-animation-section {
            margin: 0 auto;
          }
        </style>
      `
    )
    
    // Ensure the ScrollTrigger is configured for center pinning
    modifiedHtml = modifiedHtml.replace(
      /start:\s*['"]top top['"]/g,
      "start: 'top center'"
    )
    modifiedHtml = modifiedHtml.replace(
      /end:\s*['"]bottom bottom['"]/g,
      "end: 'bottom center'"
    )
    
    // Add a script to reinitialize GSAP after load
    modifiedHtml = modifiedHtml.replace(
      /<\/body>/i,
      `<script>
        // Reinitialize GSAP after iframe load
        function initGSAP() {
          if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
            
            // Reinitialize the animation
            if (typeof initScrollAnimation === 'function') {
              // Find the sections data
              const scriptTags = document.getElementsByTagName('script');
              let sectionsData = [];
              
              for (let i = 0; i < scriptTags.length; i++) {
                const scriptContent = scriptTags[i].textContent || scriptTags[i].innerText;
                if (scriptContent.includes('const sections =')) {
                  try {
                    // Extract the sections data
                    const match = scriptContent.match(/const sections = (\[.*?\]);/s);
                    if (match && match[1]) {
                      sectionsData = eval('(' + match[1] + ')');
                      break;
                    }
                  } catch (e) {
                    console.error('Error parsing sections data:', e);
                  }
                }
              }
              
              if (sectionsData.length > 0) {
                initScrollAnimation(sectionsData);
              }
            }
          }
        }
        
        // Wait for everything to load
        if (document.readyState === 'complete') {
          setTimeout(initGSAP, 100);
        } else {
          window.addEventListener('load', function() {
            setTimeout(initGSAP, 100);
          });
        }
      </script></body>`
    )
    
    doc.write(modifiedHtml)
    doc.close()

    const updateHeight = () => {
      if (!autoHeight) return
      const d = iframe.contentDocument || iframe.contentWindow?.document
      if (!d) return
      const h = Math.max(
        d.documentElement?.scrollHeight || 0,
        d.body?.scrollHeight || 0,
        d.documentElement?.offsetHeight || 0,
        d.body?.offsetHeight || 0
      )
      if (h) iframe.style.height = `${h}px`
    }

    // Update after load and on resize inside the iframe
    const win = iframe.contentWindow;
    
    if (win) {
      const handleLoad = () => {
        updateHeight();
      };
      
      win.addEventListener('load', handleLoad);
      win.addEventListener('resize', updateHeight);
      
      // A small delay to account for async image loads and fonts
      setTimeout(updateHeight, 100);
      setTimeout(updateHeight, 500);

      return () => {
        win.removeEventListener('load', handleLoad);
        win.removeEventListener('resize', updateHeight);
      };
    }
  }, [topPaddingPx, autoHeight]);

  return (
    <iframe
      ref={iframeRef}
      title="ArchSlider Test"
      style={{ 
        width: "100%", 
        height, 
        border: "none", 
        display: 'block',
        margin: '0 auto',
        overflow: 'hidden'
      }}
      className={className}
      scrolling="no"
    />
  );
}