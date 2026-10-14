import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CryptoCockpit({ isEmbedded = false, isMobile = false }) {
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const defaultApiUrl = 'https://rkws-engine.indiasouthcentral.cloudapp.azure.com/api/telemetry';
  const [apiUrl, setApiUrl] = useState(
    () => window.localStorage.getItem('crypto_telemetry_url') || defaultApiUrl
  );
  const [showConfig, setShowConfig] = useState(false);
  const [tempUrl, setTempUrl] = useState(apiUrl);

  // Fallback demo state
  const fallbackState = {
    status: 'ONLINE (DEMO STATE)',
    mode: 'testnet',
    equity: 5000.00,
    peak_equity: 5000.00,
    max_drawdown_pct: 0.00,
    active_slots: 0,
    max_slots: 6,
    consecutive_losses: 0,
    freeze_status: 'INACTIVE',
    freeze_remaining_hours: 0.0,
    btc_macro: {
      price: 81800.00,
      ema50: 83293.53,
      regime: 'BEARISH'
    },
    positions: [],
    trade_history: [],
    last_updated: new Date().toISOString()
  };

  const fetchTelemetry = async () => {
    try {
      const res = await fetch(apiUrl, { mode: 'cors' });
      if (!res.ok) throw new Error('Response status ' + res.status);
      const data = await res.json();
      setTelemetry(data);
      setLastRefreshed(new Date().toLocaleTimeString());
      setLoading(false);
    } catch (err) {
      if (!telemetry) {
        setTelemetry(fallbackState);
      }
      setLastRefreshed(new Date().toLocaleTimeString() + ' (Offline fallback)');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const timer = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(timer);
  }, [apiUrl]);

  const handleSaveUrl = (e) => {
    e.preventDefault();
    const clean = tempUrl.trim();
    setApiUrl(clean);
    window.localStorage.setItem('crypto_telemetry_url', clean);
    setShowConfig(false);
  };

  const t = telemetry || fallbackState;
  const isProfit = (t.equity - 5000.0) >= 0;
  const netRoi = ((t.equity - 5000.0) / 5000.0 * 100.0).toFixed(2);

  const containerContent = (
    <div style={{
      background: '#0b1320',
      color: '#f8fafc',
      borderRadius: isEmbedded ? 24 : 0,
      minHeight: isEmbedded ? 'auto' : '100vh',
      padding: isEmbedded ? '24px' : '40px 24px 80px',
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      border: isEmbedded ? '1px solid rgba(56, 189, 248, 0.2)' : 'none',
      boxShadow: isEmbedded ? '0 25px 80px rgba(0,0,0,0.5)' : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Navigation / Header Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          paddingBottom: 24,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 32
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {!isEmbedded && (
                <Link to="/" style={{
                  color: '#38bdf8',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginRight: 8,
                  padding: '6px 12px',
                  borderRadius: 8,
                  background: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.2)'
                }}>
                  ← RKWS STUDIO
                </Link>
              )}
              <h1 style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <span style={{ color: '#38bdf8' }}>⚡ BINANCE 5X ALPHA ENGINE</span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 4,
                  background: t.mode === 'live' ? '#ef4444' : '#f59e0b',
                  color: '#000',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {t.mode || 'TESTNET'}
                </span>
              </h1>
            </div>
            <p style={{
              margin: '6px 0 0',
              fontSize: 13,
              color: '#94a3b8',
              fontFamily: 'monospace'
            }}>
              Node: Azure node-oms (indiasouthcentral) · Headless Daemon · Vol-Parity 6 Slots
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 20,
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 10px #10b981',
                display: 'inline-block'
              }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981', fontFamily: 'monospace' }}>
                AZURE 24/7 ONLINE
              </span>
            </div>

            <button
              onClick={() => setShowConfig(!showConfig)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#cbd5e1',
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: 12,
                cursor: 'pointer',
                fontFamily: 'monospace'
              }}
            >
              ⚙ API
            </button>
          </div>
        </div>

        {/* API Endpoint Config Drawer */}
        {showConfig && (
          <form onSubmit={handleSaveUrl} style={{
            background: '#060b13',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            alignItems: 'center'
          }}>
            <label style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
              Telemetry HTTPS Endpoint:
            </label>
            <input
              type="text"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              style={{
                flex: '1 1 300px',
                background: '#0b1320',
                border: '1px solid #334155',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 13,
                fontFamily: 'monospace'
              }}
            />
            <button type="submit" style={{
              background: '#38bdf8',
              color: '#000',
              fontWeight: 700,
              padding: '8px 16px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13
            }}>
              Update Stream
            </button>
            <button type="button" onClick={() => setTempUrl(defaultApiUrl)} style={{
              background: 'transparent',
              color: '#94a3b8',
              border: '1px solid #334155',
              padding: '8px 12px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 12
            }}>
              Reset Default
            </button>
          </form>
        )}

        {/* 📊 Top Metric Bento Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 24
        }}>
          {/* Card 1: Balance & Net ROI */}
          <div style={{
            background: '#060b13',
            padding: 20,
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Equity (USDT)
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6, color: '#fff', fontFamily: 'monospace' }}>
              ${Number(t.equity || 5000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: 12, marginTop: 6, color: isProfit ? '#10b981' : '#ef4444', fontWeight: 700, fontFamily: 'monospace' }}>
              {isProfit ? '▲ +' : '▼ '}{netRoi}% net ROI
            </div>
          </div>

          {/* Card 2: Peak HWM & Drawdown */}
          <div style={{
            background: '#060b13',
            padding: 20,
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Peak Equity / Drawdown
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6, color: '#fff', fontFamily: 'monospace' }}>
              ${Number(t.peak_equity || 5000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: 12, marginTop: 6, color: t.max_drawdown_pct > 15 ? '#ef4444' : '#38bdf8', fontWeight: 700, fontFamily: 'monospace' }}>
              Drawdown: {t.max_drawdown_pct || 0.0}% (Target &lt; 23%)
            </div>
          </div>

          {/* Card 3: Active Slots & Vol-Parity */}
          <div style={{
            background: '#060b13',
            padding: 20,
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Slot Allocation
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6, color: '#fff', fontFamily: 'monospace' }}>
              {t.active_slots || 0} <span style={{ fontSize: 18, color: '#64748b' }}>/ {t.max_slots || 6} Slots</span>
            </div>
            <div style={{ fontSize: 12, marginTop: 6, color: '#94a3b8', fontFamily: 'monospace' }}>
              5.0x Leverage · Vol-Parity Sized
            </div>
          </div>

          {/* Card 4: BTC Macro Regime */}
          <div style={{
            background: '#060b13',
            padding: 20,
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              BTC 4H Macro Sentinel
            </div>
            <div style={{
              fontSize: 22,
              fontWeight: 800,
              marginTop: 6,
              color: t.btc_macro?.regime === 'BULLISH' ? '#10b981' : '#f59e0b',
              fontFamily: 'monospace'
            }}>
              {t.btc_macro?.regime || 'BEARISH'}
            </div>
            <div style={{ fontSize: 12, marginTop: 6, color: '#cbd5e1', fontFamily: 'monospace' }}>
              BTC: ${t.btc_macro?.price ? Number(t.btc_macro.price).toLocaleString('en-US') : '81,800'} · EMA50: ${t.btc_macro?.ema50 ? Number(t.btc_macro.ema50).toLocaleString('en-US') : '83,293'}
            </div>
          </div>
        </div>

        {/* 🛡️ Risk Sentinel & Freeze Breaker Status */}
        <div style={{
          background: '#060b13',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: '16px 20px',
          marginBottom: 32,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>🛡️</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>
                Circuit Breakers &amp; Cascade Guard
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2, fontFamily: 'monospace' }}>
                Consecutive Losses: <span style={{ color: t.consecutive_losses > 0 ? '#f59e0b' : '#10b981' }}>{t.consecutive_losses}/2</span> (Trigger: 48h freeze) · Anti-Martingale Decay: 100% Active
              </div>
            </div>
          </div>

          <div style={{
            fontSize: 12,
            fontFamily: 'monospace',
            padding: '6px 12px',
            borderRadius: 8,
            background: t.freeze_status === 'ACTIVE' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.1)',
            color: t.freeze_status === 'ACTIVE' ? '#ef4444' : '#10b981',
            border: `1px solid ${t.freeze_status === 'ACTIVE' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.2)'}`
          }}>
            SYSTEM STATUS: {t.freeze_status === 'ACTIVE' ? `FROZEN (${t.freeze_remaining_hours}h left)` : 'TRADING ACTIVE'}
          </div>
        </div>

        {/* 🎯 Active Positions Table */}
        <div style={{
          background: '#060b13',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 32
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🚀 Active Positions</span>
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>
                ({t.positions?.length || 0} active)
              </span>
            </h2>
            <div style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>
              Refreshed: {lastRefreshed || 'Just now'}
            </div>
          </div>

          {t.positions && t.positions.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left', fontFamily: 'monospace' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                    <th style={{ padding: '10px 12px' }}>SYMBOL</th>
                    <th style={{ padding: '10px 12px' }}>SIDE</th>
                    <th style={{ padding: '10px 12px' }}>ENTRY</th>
                    <th style={{ padding: '10px 12px' }}>CURRENT</th>
                    <th style={{ padding: '10px 12px' }}>STOP LOSS</th>
                    <th style={{ padding: '10px 12px' }}>MARGIN (5X)</th>
                    <th style={{ padding: '10px 12px' }}>RATCHET STAGE</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>UNREALIZED ROE</th>
                  </tr>
                </thead>
                <tbody>
                  {t.positions.map((pos, idx) => {
                    const posProfit = (pos.roe_pct || 0) >= 0;
                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid #0f172a' }}>
                        <td style={{ padding: '12px', fontWeight: 700, color: '#fff' }}>{pos.symbol}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: 4,
                            background: pos.type === 'LONG' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            color: pos.type === 'LONG' ? '#10b981' : '#ef4444',
                            fontWeight: 700
                          }}>
                            {pos.type}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>${pos.entry_price}</td>
                        <td style={{ padding: '12px' }}>${pos.current_price}</td>
                        <td style={{ padding: '12px', color: '#f59e0b' }}>${pos.stop_loss}</td>
                        <td style={{ padding: '12px' }}>${pos.margin} (${pos.notional})</td>
                        <td style={{ padding: '12px', color: '#38bdf8' }}>{pos.ratchet_stage}</td>
                        <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: posProfit ? '#10b981' : '#ef4444' }}>
                          {posProfit ? '+' : ''}{pos.roe_pct}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '48px 24px',
              color: '#64748b',
              background: '#0b1320',
              borderRadius: 12,
              border: '1px dashed #1e293b'
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📡</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>
                Scanning 40 Binance USDT-M Perpetuals for High-Probability Breakouts
              </div>
              <div style={{ fontSize: 12, marginTop: 4, color: '#64748b' }}>
                Engine daemon is cycling every 60 seconds on Azure. Positions enter automatically when ADX &gt; 25.0 and Relative Strength confirms.
              </div>
            </div>
          )}
        </div>

        {/* 📜 Execution History Table */}
        <div style={{
          background: '#060b13',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 32
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📜 Recent Closed Executions</span>
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>
              (Live OMS Audit Log)
            </span>
          </h2>

          {t.trade_history && t.trade_history.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left', fontFamily: 'monospace' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                    <th style={{ padding: '10px 12px' }}>SYMBOL</th>
                    <th style={{ padding: '10px 12px' }}>SIDE</th>
                    <th style={{ padding: '10px 12px' }}>ENTRY</th>
                    <th style={{ padding: '10px 12px' }}>EXIT</th>
                    <th style={{ padding: '10px 12px' }}>RETURN %</th>
                    <th style={{ padding: '10px 12px' }}>PROFIT/LOSS</th>
                    <th style={{ padding: '10px 12px' }}>EXIT REASON</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>TIMESTAMP</th>
                  </tr>
                </thead>
                <tbody>
                  {t.trade_history.slice(-10).reverse().map((tr, idx) => {
                    const isWin = (tr.dollar_pnl || 0) >= 0;
                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid #0f172a' }}>
                        <td style={{ padding: '12px', fontWeight: 700, color: '#fff' }}>{tr.symbol}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: 4,
                            background: tr.type === 'LONG' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            color: tr.type === 'LONG' ? '#10b981' : '#ef4444',
                            fontWeight: 700
                          }}>
                            {tr.type}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>${tr.entry_price}</td>
                        <td style={{ padding: '12px' }}>${tr.exit_price}</td>
                        <td style={{ padding: '12px', fontWeight: 700, color: isWin ? '#10b981' : '#ef4444' }}>
                          {isWin ? '+' : ''}{tr.return_pct}%
                        </td>
                        <td style={{ padding: '12px', fontWeight: 700, color: isWin ? '#10b981' : '#ef4444' }}>
                          {isWin ? '+' : ''}${tr.dollar_pnl}
                        </td>
                        <td style={{ padding: '12px', color: '#94a3b8' }}>{tr.reason}</td>
                        <td style={{ padding: '12px', textAlign: 'right', color: '#64748b' }}>
                          {tr.exit_time ? new Date(tr.exit_time).toLocaleTimeString() : 'N/A'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '32px 24px',
              color: '#64748b',
              background: '#0b1320',
              borderRadius: 12,
              fontFamily: 'monospace',
              fontSize: 13
            }}>
              Zero closed trades in current session. Daemon active on Binance Testnet.
            </div>
          )}
        </div>

        {/* 🔬 Architecture Proof-of-Work Spec */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(6, 11, 19, 0.95), rgba(11, 19, 32, 0.95))',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          borderRadius: 16,
          padding: 24
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px' }}>
            🔬 Production Execution Specification
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
            fontSize: 12,
            color: '#94a3b8',
            lineHeight: 1.6
          }}>
            <div>
              <strong style={{ color: '#fff' }}>Vol-Parity Sizing:</strong> Allocates position size inversely proportional to 14-period ATR so every slot contributes equal dollar volatility risk (0.5% - 2.0% equity).
            </div>
            <div>
              <strong style={{ color: '#fff' }}>3-Stage Asymmetric Chandelier:</strong> Stage 1 locks breakeven (+0.0R) at 1.5R; Stage 2 ratchets to +1.0R at 2.5R; Stage 3 trails 3.0x ATR for runners up to 3.5R.
            </div>
            <div>
              <strong style={{ color: '#fff' }}>Friction-First Integrity:</strong> Applies exact Binance taker fees (0.05%) on stops, maker rebate captures on entries, and 8-hour funding rates.
            </div>
            <div>
              <strong style={{ color: '#fff' }}>Continuous Telemetry:</strong> Azure daemon exposes non-blocking HTTPS stream via Let&apos;s Encrypt Caddy reverse proxy to rkws.in with zero server load.
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return containerContent;
}
