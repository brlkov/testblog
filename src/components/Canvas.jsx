import React, {useEffect, useRef} from 'react';

const Canvas = () => {
    const canvasRef = useRef()

    useEffect(() => {

        const ctx = canvasRef.current.getContext("2d");
        const cw = canvasRef.current.width = 250;
        const ch = canvasRef.current.height = 250;
        const cx = cw / 2,  cy = ch / 2;
        const rad = Math.PI / 180;
        const howMany = 500;
        const p = [];
        const colors = ["242,41,41", "222,80,80", "247,111,111", "255,145,145", "252,199,199"];
        ctx.strokeStyle = "white";
        ctx.globalAlpha = .7;

        function particles()
        {
            this.r = randomIntFromInterval(2, 12);
            const innerR = Math.round(Math.random() * 130) + 1;
            const innerA = Math.round(Math.random() * 360) + 1;
            this.x = cx + innerR * Math.cos(innerA * rad);
            this.y = cy + 20 + innerR * Math.sin(innerA * rad);
            this.ix = (Math.random()) * (Math.random() < 0.5 ? -1 : 1);
            this.iy = (Math.random()) * (Math.random() < 0.5 ? -1 : 1);
            this.alpha = Math.random();
            this.c = "rgba(" + colors[Math.round(Math.random() * colors.length) + 1] + "," + this.alpha + ")";
        }

        for (let i = 0; i < howMany; i++)
        {
            p[i] = new particles();
        }

        function Draw()
        {
            ctx.fillStyle = "rgba(255,255,255,.1)";
            ctx.fillRect(0, 0, cw, ch);
            for (let i = 0; i < p.length; i++)
            {
                ctx.fillStyle = p[i].c;
                // Текущий путь для  isPointInPath
                thePath(p[i].r);

                if (ctx.isPointInPath(p[i].x, p[i].y))
                {
                    p[i].x += p[i].ix;
                    p[i].y += p[i].iy;
                    ctx.beginPath();
                    ctx.arc(p[i].x, p[i].y, p[i].r, 0, 2 * Math.PI);
                    ctx.fill();

                } else {
                    p[i].ix = -1 * p[i].ix;
                    p[i].iy = -1 * p[i].iy;
                    p[i].x += p[i].ix;
                    p[i].y += p[i].iy;
                }
            }
            window.requestAnimationFrame(Draw);
        }
        window.requestAnimationFrame(Draw);

        function thePath(r)
        {
            //Рисуем наше сердечко
            ctx.beginPath();
            ctx.moveTo(125, 100);
            ctx.arc(175, 100, 50 - r, Math.PI, Math.PI * 0.23);
            ctx.lineTo(125, 225);
            ctx.arc(75, 100, 50 - r, Math.PI * 0.77, 0);
        }

        function randomIntFromInterval(mn, mx)
        {
            return ~~(Math.random() * (mx - mn + 1) + mn);
        }

    })


    return (
        <div className="canvas">
            <canvas ref={canvasRef} width={250} height={250}/>
        </div>
    );
};

export default Canvas;