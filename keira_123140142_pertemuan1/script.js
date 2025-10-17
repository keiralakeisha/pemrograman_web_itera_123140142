class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.init();
    }

    init() {
        this.renderTasks();
        this.setupEventListeners();
        this.updateStats();
        this.updateCourseFilter();
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    setupEventListeners() {
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        document.getElementById('searchInput').addEventListener('input', () => {
            this.renderTasks();
        });

        document.getElementById('statusFilter').addEventListener('change', () => {
            this.renderTasks();
        });

        document.getElementById('courseFilter').addEventListener('change', () => {
            this.renderTasks();
        });
    }

    validateForm(taskName, course, deadline) {
        let isValid = true;

        document.getElementById('nameError').textContent = '';
        document.getElementById('courseError').textContent = '';
        document.getElementById('deadlineError').textContent = '';

        if (!taskName.trim()) {
            document.getElementById('nameError').textContent = 'Nama tugas tidak boleh kosong';
            isValid = false;
        }

        if (!course.trim()) {
            document.getElementById('courseError').textContent = 'Mata kuliah tidak boleh kosong';
            isValid = false;
        }

        if (!deadline) {
            document.getElementById('deadlineError').textContent = 'Deadline harus diisi';
            isValid = false;
        } else if (new Date(deadline) < new Date()) {
            document.getElementById('deadlineError').textContent = 'Deadline tidak boleh di masa lalu';
            isValid = false;
        }

        return isValid;
    }

    addTask() {
        const taskName = document.getElementById('taskName').value;
        const course = document.getElementById('course').value;
        const deadline = document.getElementById('deadline').value;

        if (!this.validateForm(taskName, course, deadline)) {
            return;
        }

        const newTask = {
            id: Date.now(),
            name: taskName.trim(),
            course: course.trim(),
            deadline: deadline,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.updateCourseFilter();
        
        document.getElementById('taskForm').reset();
        
        alert('Tugas berhasil ditambahkan!');
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
    }

    deleteTask(id) {
        if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.updateCourseFilter();
        }
    }

    getFilteredTasks() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const courseFilter = document.getElementById('courseFilter').value;

        return this.tasks.filter(task => {
            const matchesSearch = task.name.toLowerCase().includes(searchTerm) || 
                                task.course.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === 'all' || 
                                (statusFilter === 'completed' && task.completed) ||
                                (statusFilter === 'pending' && !task.completed);
            const matchesCourse = courseFilter === 'all' || task.course === courseFilter;

            return matchesSearch && matchesStatus && matchesCourse;
        });
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <h3>Tidak ada tugas</h3>
                    <p>Tambahkan tugas pertama Anda untuk memulai!</p>
                </div>
            `;
            return;
        }

        taskList.innerHTML = filteredTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <div class="task-info">
                    <div class="task-name">${task.name}</div>
                    <div class="task-meta">
                        <strong>Mata Kuliah:</strong> ${task.course} | 
                        <strong>Deadline:</strong> 
                        <span class="task-deadline ${this.isDeadlineApproaching(task.deadline) ? 'deadline-urgent' : ''}">
                            ${this.formatDate(task.deadline)}
                        </span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-complete" onclick="taskManager.toggleTask(${task.id})">
                        ${task.completed ? 'Batal' : 'Selesai'}
                    </button>
                    <button class="btn-delete" onclick="taskManager.deleteTask(${task.id})">
                        Hapus
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateStats() {
        const pendingCount = this.tasks.filter(task => !task.completed).length;
        document.getElementById('pendingCount').textContent = pendingCount;
    }

    updateCourseFilter() {
        const courseFilter = document.getElementById('courseFilter');
        const courses = [...new Set(this.tasks.map(task => task.course))];
        
        const currentSelection = courseFilter.value;
        
        courseFilter.innerHTML = '<option value="all">Semua Mata Kuliah</option>' +
            courses.map(course => `<option value="${course}">${course}</option>`).join('');
        
        if (courses.includes(currentSelection)) {
            courseFilter.value = currentSelection;
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    isDeadlineApproaching(deadline) {
        const now = new Date();
        const taskDeadline = new Date(deadline);
        const timeDiff = taskDeadline - now;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        return daysDiff <= 2 && daysDiff > 0; // 2 hari mendatang
    }
}

const taskManager = new TaskManager();