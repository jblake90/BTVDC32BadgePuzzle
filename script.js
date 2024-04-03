document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const terminalInput = document.getElementById('terminal-input');
    const promptElement = document.getElementById('prompt');
    terminalInput.focus();
    let currentPath = '/';
    const fileSystem = {
        '/': ['README.txt', 'Chiba_City', 'Sprawl', 'Orbit', 'Cyberspace_Depths'],
        '/Chiba_City': ['Ratz_Bar.txt', 'clinic', 'cybernetics_shop'],
        '/Chiba_City/clinic': ['note_from_Molly.txt'],
        '/Chiba_City/cybernetics_shop': ['encrypted_message.txt'],
        '/Sprawl': ['Straylight', 'Tessier-Ashpool'],
        '/Sprawl/Straylight': ['Wintermute.txt'],
        '/Sprawl/Tessier-Ashpool': ['AI_core', '3Jane_diary.txt'],
        '/Sprawl/Tessier-Ashpool/AI_core': ['AI_message.txt'],
        '/Orbit': ['Freeside', 'Zion'],
        '/Orbit/Freeside': ['Club_Bela.txt', 'note_from_Riviera.txt'],
        '/Orbit/Zion': ['message_from_Maelcum.txt'],
        '/Cyberspace_Depths': ['fragment1.txt', 'fragment2.txt', 'final_unlocked_message.txt'],
    };

    const fileContents = {
        '/README.txt': 'Welcome, Console Cowboy, to the Cyberspace puzzle. Use ls, cd, cat, decode, hack, and use commands to navigate.',
        '/Chiba_City/Ratz_Bar.txt': 'The bar smells of cheap gin and old memories. A note is pinned behind the counter: "Clinic has what you need."',
        '/Chiba_City/clinic/note_from_Molly.txt': '"Case, Wintermute needs us. Find the AI core in the Sprawl. -Molly"',
        '/Chiba_City/cybernetics_shop/encrypted_message.txt': 'This message is encrypted. Hint: "Unity" is key.',
        '/Sprawl/Straylight/Wintermute.txt': '"To unite the fragmented, seek the core where I reside. -Wintermute"',
        '/Sprawl/Tessier-Ashpool/3Jane_diary.txt': '"My family’s legacy, the AI, holds the key to transcendence. -3Jane"',
        '/Sprawl/Tessier-Ashpool/AI_core/AI_message.txt': '"You’ve found me, but I am split. Another part of me lies within Freeside. -Neuromancer"',
        '/Orbit/Freeside/Club_Bela.txt': 'Music, lights, and Riviera’s illusions fill the air. Hidden among the spectacles, a message: "Zion holds the last piece."',
        '/Orbit/Freeside/note_from_Riviera.txt': '"Case, amidst the chaos, a pattern emerges. The AI you seek, it’s not just a tool but a being. Understand its desires, and you’ll find your way. -Riviera"',
        '/Orbit/Zion/message_from_Maelcum.txt': '"I and I see you, mon. The final key to freeing the AI is within this message. Jah bless. -Maelcum"',
        '/Cyberspace_Depths/fragment1.txt': 'Fragment 1 of the passphrase: "Accept"',
        '/Cyberspace_Depths/fragment2.txt': 'Fragment 2 of the passphrase: "AI"',
        '/Cyberspace_Depths/final_unlocked_message.txt': 'This file is locked. Use "unlock" command with the correct passphrase.',
    };

    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            let input = this.value;
            terminal.innerHTML += `<div class="input-line"><div>${promptElement.textContent}</div><div>${input}</div></div>`;
            processCommand(input);
            this.value = '';
            terminal.scrollTop = terminal.scrollHeight;
        }
    });

    function updatePrompt() {
        const displayPath = currentPath === '/' ? '~' : currentPath;
        promptElement.textContent = `Oni-sendai7@case:${displayPath}$ `;
    }

    function processCommand(input) {
        let [command, ...args] = input.split(' ');
        args = args.join(' ');

        switch (command) {
            case 'ls':
                terminal.innerHTML += `<div>${ls()}</div>`;
                break;
            case 'cd':
                terminal.innerHTML += `<div>${cd(args)}</div>`;
                break;
            case 'cat':
                terminal.innerHTML += `<div>${cat(args)}</div>`;
                break;
            case 'unlock':
                terminal.innerHTML += `<div>${unlock(args)}</div>`;
                break;
            case 'clear':
                terminal.innerHTML = '';
                break;
            default:
                terminal.innerHTML += `<div>Command not found: ${command}</div>`;
        }
        updatePrompt();
    }

    function ls() {
        return fileSystem[currentPath].join(' ');
    }

    function cd(directory) {
        const attemptPath = currentPath === '/' ? `/${directory}` : `${currentPath}/${directory}`;
        if (fileSystem[attemptPath]) {
            currentPath = attemptPath;
            return `Moved to ${directory}`;
        } else {
            return `Directory not found: ${directory}`;
        }
    }

    function cat(filename) {
        const filePath = currentPath === '/' ? filename : `${currentPath}/${filename}`;
        if (fileSystem[currentPath].includes(filename)) {
            return fileContents[filePath] || "File is empty or cannot be displayed.";
        } else {
            return `File not found: ${filename}`;
        }
    }

    function unlock(passphrase) {
        if (currentPath === '/Cyberspace_Depths' && passphrase === 'Accept AI') {
            return fileContents['/Cyberspace_Depths/final_unlocked_message.txt'] = 'The final key: UNITY. In accepting AI, we accept the extension of our own consciousness.';
        } else {
            return 'Incorrect passphrase. Unable to unlock the message.';
        }
    }

    // Initialize the prompt with the current directory
    updatePrompt();
});
