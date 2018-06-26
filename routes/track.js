var express = require('express');
var router = express.Router();
const TRACK_CNT = 10;

router.route('/')
.get((req, res) => {
    var tracks = [[],[],[],[],[],[],[],[],[],[]];
    var trackName = [
        "비쥬얼컴퓨팅 트랙",
        "멀티미디어 트랙",
        "사물인터넷 트랙",
        "시스템응용 트랙",
        "지능형인지 트랙",
        "가상현실 트랙",
        "인공지능 트랙",
        "응용소프트웨어 트랙",
        "정보보호 트랙",
        "데이터사이언스 트랙"
    ]
    var sql = 'SELECT * FROM Subject';
    pool.query(sql, (err, subjects) => {
        if (err) 
        {
            console.log('err : ' + err);
            res.status(500).send("DB Error");
        } 
        else 
        {
            if(subjects.length == 0)
            {
                res.send("이 대학교는 강의가 없습니다.");
            }
            else 
            {
                console.log('len:', subjects.length);
                for(var idx in subjects)
                {
                    var trackname = subjects[idx].Track_Name;
                    console.log(trackname);

                    for(var i = 0; i<TRACK_CNT; i++)
                    {
                        if(parseInt(trackname[i]) == 1)
                            tracks[i].push(subjects[idx]);
                    }
                }
                res.render('track',{tracks: tracks, trackName: trackName, id: req.session.authID});
            }
        }
    });
})
.post((req, res)=>{
   res.render('track');
});

module.exports = router;
