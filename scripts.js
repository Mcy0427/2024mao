<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>專業論壇</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <style>
        body {
            background-color: #E0F7FA;
        }
        .bg-lightblue {
            background-color: #03A9F4 !important;
        }
        .fade-in {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
    </style>
</head>
<body>
    <header class="bg-lightblue text-white text-center py-3">
        <h1>專業論壇</h1>
        <nav class="navbar navbar-expand-lg navbar-dark">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item"><a class="nav-link" href="index.html">首頁</a></li>
                <li class="nav-item"><a class="nav-link" href="profile.html">個人主頁面</a></li>
                <li class="nav-item"><a class="nav-link" href="inspiration.html">靈感分享區</a></li>
                <li class="nav-item"><a class="nav-link" href="forum.html">專業論壇</a></li>
                <li class="nav-item"><a class="nav-link" href="collaboration.html">合作平台</a></li>
                <li class="nav-item"><a class="nav-link" href="library.html">文章圖書館</a></li>
            </ul>
        </nav>
    </header>
    <main class="container mt-4">
        <section>
            <h2 class="fade-in d-none">論壇主題</h2>
            <div id="forum-topics" class="list-group fade-in d-none">
                <!-- 論壇主題將由JavaScript動態加載 -->
            </div>
        </section>
        <section class="mt-4">
            <h2 class="fade-in d-none">主題內的帖子</h2>
            <div id="topic-posts" class="list-group fade-in d-none">
                <!-- 主題內的帖子將由JavaScript動態加載 -->
            </div>
        </section>
        <section class="mt-4">
            <h2 class="fade-in d-none">發表新帖</h2>
            <form id="new-post-form" class="fade-in d-none">
                <div class="form-group">
                    <label for="post-title">帖子標題</label>
                    <input type="text" class="form-control" id="post-title" placeholder="輸入標題">
                </div>
                <div class="form-group">
                    <label for="post-content">作品內容</label>
                    <textarea class="form-control" id="post-content" rows="3" placeholder="輸入內容"></textarea>
                </div>
                <div class="form-group">
                    <label for="post-image">上傳圖片</label>
                    <input type="file" class="form-control" id="post-image">
                </div>
                <button type="submit" class="btn btn-primary">發表</button>
            </form>
        </section>
    </main>
    <footer class="bg-lightblue text-white text-center py-3 mt-4">
        <p>&copy; 2024 靈感共享平台</p>
    </footer>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
    <script>
        $(document).ready(function() {
            // 檢查元素是否在視口內的函數
            function isInViewport(element) {
                var rect = element.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }

            // 滾動時按順序淡入元素，並帶有延遲
            $(window).on('scroll', function() {
                $('.fade-in').each(function(index) {
                    if (isInViewport(this) && !$(this).hasClass('in-view')) {
                        $(this).addClass('in-view').css('transition-delay', index * 0.2 + 's').removeClass('d-none');
                    }
                });
            });

            // 頁面加載時檢查，以確保已在視口內的元素立即顯示
            $(window).trigger('scroll');

            // 模擬論壇主題數據
            var topics = [
                { id: 1, title: "名片" },
                { id: 2, title: "LOGO" },
                { id: 3, title: "主視覺" }
            ];

            // 動態加載論壇主題
            topics.forEach(function(topic) {
                $('#forum-topics').append('<a href="#" class="list-group-item list-group-item-action" onclick="loadPosts(' + topic.id + ')">' + topic.title + '</a>');
            });

            // 模擬帖子數據
            var posts = {
                1: [
                    { title: "名片", content: "案例1", image: "image1.jpg" },
                    { title: "名片", content: "案例2", image: "下載.jpg" }
                ],
                2: [
                    { title: "LOGO", content: "案例1", image: "0321-cover.webp" },
                    { title: "LOGO", content: "案例2", image: "Mountain-logo-Design-Graphics-9785421-1-1-580x435.png" }
                ],
                3: [
                    { title: "主視覺", content: "案例1", image: "下載 (1).jpg" },
                    { title: "主視覺", content: "案例2", image: "下載.png" }
                ]
            };

            // 加載指定主題的帖子
            window.loadPosts = function(topicId) {
                $('#topic-posts').empty();
                posts[topicId].forEach(function(post) {
                    $('#topic-posts').append(
                        '<div class="list-group-item">' +
                        '<h5>' + post.title + '</h5>' +
                        '<p>' + post.content + '</p>' +
                        '<img src="' + post.image + '" class="img-fluid" alt="Post Image">' +
                        '</div>'
                    );
                });
            };

            // 發表新作品
            $('#new-post-form').submit(function(event) {
                event.preventDefault();
                var title = $('#post-title').val();
                var content = $('#post-content').val();
                var imageFile = $('#post-image')[0].files[0];
                if (title && content && imageFile) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $('#topic-posts').append(
                            '<div class="list-group-item">' +
                            '<h5>' + title + '</h5>' +
                            '<p>' + content + '</p>' +
                            '<img src="' + e.target.result + '" class="img-fluid" alt="Post Image">' +
                            '</div>'
                        );
                        $('#post-title').val('');
                        $('#post-content').val('');
                        $('#post-image').val('');
                    };
                    reader.readAsDataURL(imageFile);
                }
            });
        });
    </script>
</body>
</html>
$(document).ready(function() {
    // 檢查元素是否在視口內的函數
    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // 滾動時按順序淡入元素，並帶有延遲
    $(window).on('scroll', function() {
        // 變換背景顏色
        var scrollPos = $(window).scrollTop();
        if (scrollPos > 100) {
            $('body').removeClass('bg-lightblue').addClass('bg-lightgreen');
        } else {
            $('body').removeClass('bg-lightgreen').addClass('bg-lightblue');
        }

        // 檢查淡入效果
        $('.fade-in').each(function(index) {
            if (isInViewport(this) && !$(this).hasClass('in-view')) {
                $(this).addClass('in-view').css('transition-delay', index * 0.2 + 's').removeClass('d-none');
            }
        });
    });

    // 頁面加載時檢查，以確保已在視口內的元素立即顯示
    $(window).trigger('scroll');
});
