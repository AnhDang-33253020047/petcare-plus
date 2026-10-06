import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Brand metadata
document.title = 'PetCare+'

const setMeta = (name: string, content: string, attr = 'name') => {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
  el.content = content
}

setMeta('description', 'Nền tảng chăm sóc thú cưng và bảo hiểm thú y hàng đầu Việt Nam — dinh dưỡng cá nhân hóa, đặt lịch tiêm phòng, bảo hiểm cashless.')
setMeta('og:site_name', 'PetCare+', 'property')
setMeta('og:title', 'PetCare+ — Chăm sóc trọn đời, nhẹ gánh viện phí', 'property')
setMeta('og:url', 'https://petcareplus.vn', 'property')
setMeta('og:type', 'website', 'property')

const canonical = (document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)
  ?? (() => { const el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el); return el })()
canonical.href = 'https://petcareplus.vn'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
