/**
 * @fileoverview GitHub Pages上で技術メモのMarkdownを読み込み、HTMLとしてレンダリングするモジュール。
 *               サイドバーにファイルリストを表示し、クリック時にフェッチと描画を行います。
 * @module app
 */

// docs/tech_memos/ディレクトリ内にあるMarkdownファイルのリスト。
// ファイル追加時にここを手動で更新するか、ビルドプロセスで生成する必要があります。
const markdownFiles = [
    { title: "AWS Lambda", path: "docs/tech_memos/aws_lambda.md" },
    { title: "Cloudflare Worker D1", path: "docs/tech_memos/cloudflare_worker_d1.md" },
    { title: "C# Client Server Architecture", path: "docs/tech_memos/csharp_client_server_architecture.md" },
    { title: "Electron", path: "docs/tech_memos/electron.md" },
    { title: "Firebase Evaluation", path: "docs/tech_memos/firebase_evaluation.md" },
    { title: "GAS App Development", path: "docs/tech_memos/gas_app_development.md" },
    { title: "GitHub Pages Supabase", path: "docs/tech_memos/github_pages_supabase.md" },
    { title: "Node.js", path: "docs/tech_memos/nodejs.md" },
    { title: "Ruby on Rails", path: "docs/tech_memos/ruby_on_rails.md" }
];

/**
 * サイドバーにMarkdownファイルのリストアイテムを生成し、DOMに追加します。
 * 各アイテムにクリックイベントリスナーを設定し、Markdownの読み込みをトリガーします。
 *
 * @function renderSidebarList
 */
function renderSidebarList() {
    const listContainer = document.getElementById('memo-list');

    // 定義されたファイルのリストをループしてリスト項目を作成
    markdownFiles.forEach(file => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        link.textContent = file.title;
        // hrefには'#'を設定し、ページ遷移を防ぐ
        link.href = '#';
        link.dataset.path = file.path; // データ属性としてファイルパスを保持

        // クリック時にMarkdownを読み込むイベントを登録
        link.addEventListener('click', (event) => {
            event.preventDefault(); // デフォルトのリンク動作を無効化
            loadAndRenderMarkdown(file.path);
        });

        listItem.appendChild(link);
        listContainer.appendChild(listItem);
    });
}

/**
 * 指定されたパスからMarkdownファイルをフェッチし、marked.jsを用いてHTMLに変換後、
 * メインコンテンツ領域に表示します。
 *
 * @async
 * @function loadAndRenderMarkdown
 * @param {string} filePath - 読み込むMarkdownファイルのパス
 */
async function loadAndRenderMarkdown(filePath) {
    const contentContainer = document.getElementById('content');

    try {
        // ロード中の表示
        contentContainer.innerHTML = '<p>読み込み中...</p>';

        // fetch APIでファイルを取得
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const markdownText = await response.text();

        // marked.parseを使ってMarkdownをHTML文字列に変換
        // （marked.jsがグローバル空間に読み込まれていることを前提とします）
        const htmlContent = marked.parse(markdownText);

        // 変換されたHTMLをコンテンツ領域に設定
        contentContainer.innerHTML = htmlContent;

    } catch (error) {
        console.error('Markdownファイルの読み込みに失敗しました:', error);
        contentContainer.innerHTML = `<p style="color: red;">ファイルの読み込みに失敗しました。</p>`;
    }
}

/**
 * DOMのロード完了後に初期化処理を実行します。
 */
document.addEventListener('DOMContentLoaded', () => {
    // サイドバーのリストを描画する
    renderSidebarList();
});
