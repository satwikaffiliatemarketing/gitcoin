// Main JavaScript for the Dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the dashboard data
    fetchDashboardData();
    
    // Update the last updated timestamp
    updateLastUpdated();
});

// Function to fetch the dashboard data from the JSON file
async function fetchDashboardData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch dashboard data');
        }
        
        const data = await response.json();
        
        // Update the dashboard with the fetched data
        updateDashboard(data);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Show a fallback with random data if the fetch fails
        generateRandomData();
    }
}

// Function to update the dashboard with the fetched data
function updateDashboard(data) {
    // Update stats
    updateStats(data.stats);
    
    // Update activity list
    updateActivityList(data.activities);
}

// Function to update the stats cards
function updateStats(stats) {
    if (!stats) return;
    
    // Update users count
    const usersCount = document.getElementById('users-count');
    const usersChange = document.getElementById('users-change');
    if (usersCount && stats.users) {
        usersCount.textContent = stats.users.count.toLocaleString();
        usersChange.textContent = formatPercentage(stats.users.change);
        usersChange.className = `stat-change ${stats.users.change >= 0 ? 'up' : 'down'}`;
    }
    
    // Update revenue
    const revenueCount = document.getElementById('revenue-count');
    const revenueChange = document.getElementById('revenue-change');
    if (revenueCount && stats.revenue) {
        revenueCount.textContent = `$${stats.revenue.amount.toLocaleString()}`;
        revenueChange.textContent = formatPercentage(stats.revenue.change);
        revenueChange.className = `stat-change ${stats.revenue.change >= 0 ? 'up' : 'down'}`;
    }
    
    // Update projects
    const projectsCount = document.getElementById('projects-count');
    const projectsChange = document.getElementById('projects-change');
    if (projectsCount && stats.projects) {
        projectsCount.textContent = stats.projects.count.toLocaleString();
        projectsChange.textContent = formatPercentage(stats.projects.change);
        projectsChange.className = `stat-change ${stats.projects.change >= 0 ? 'up' : 'down'}`;
    }
    
    // Update tasks
    const tasksCount = document.getElementById('tasks-count');
    const tasksChange = document.getElementById('tasks-change');
    if (tasksCount && stats.tasks) {
        tasksCount.textContent = stats.tasks.count.toLocaleString();
        tasksChange.textContent = formatPercentage(stats.tasks.change);
        tasksChange.className = `stat-change ${stats.tasks.change >= 0 ? 'up' : 'down'}`;
    }
}

// Function to update the activity list
function updateActivityList(activities) {
    if (!activities || !activities.length) return;
    
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;
    
    // Clear existing activities
    activityList.innerHTML = '';
    
    // Add new activities
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-details">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${formatTimeAgo(activity.timestamp)}</div>
            </div>
        `;
        
        activityList.appendChild(activityItem);
    });
}

// Function to get the appropriate icon for an activity type
function getActivityIcon(type) {
    const icons = {
        'user': 'fa-user',
        'project': 'fa-folder',
        'task': 'fa-tasks',
        'payment': 'fa-credit-card',
        'message': 'fa-comment',
        'alert': 'fa-exclamation-circle'
    };
    
    return icons[type] || 'fa-circle';
}

// Function to format a percentage value
function formatPercentage(value) {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value}%`;
}

// Function to format a timestamp as "time ago"
function formatTimeAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval === 1 ? '1 year ago' : `${interval} years ago`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval === 1 ? '1 month ago' : `${interval} months ago`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval === 1 ? '1 day ago' : `${interval} days ago`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
    }
    
    return seconds < 10 ? 'just now' : `${Math.floor(seconds)} seconds ago`;
}

// Function to update the "last updated" timestamp
function updateLastUpdated() {
    const lastUpdated = document.getElementById('last-updated');
    if (lastUpdated) {
        const now = new Date();
        lastUpdated.textContent = now.toLocaleString();
    }
}

// Function to generate random data if the fetch fails
function generateRandomData() {
    const randomStats = {
        stats: {
            users: {
                count: Math.floor(Math.random() * 10000) + 1000,
                change: Math.floor(Math.random() * 20) - 5
            },
            revenue: {
                amount: Math.floor(Math.random() * 100000) + 10000,
                change: Math.floor(Math.random() * 30) - 5
            },
            projects: {
                count: Math.floor(Math.random() * 500) + 50,
                change: Math.floor(Math.random() * 20) - 10
            },
            tasks: {
                count: Math.floor(Math.random() * 2000) + 200,
                change: Math.floor(Math.random() * 25) - 5
            }
        },
        activities: generateRandomActivities()
    };
    
    updateDashboard(randomStats);
}

// Function to generate random activities
function generateRandomActivities() {
    const activities = [];
    const activityTypes = ['user', 'project', 'task', 'payment', 'message', 'alert'];
    const activityTitles = [
        'New user registered',
        'Project created',
        'Task completed',
        'Payment received',
        'New message',
        'System alert',
        'User updated profile',
        'Project milestone reached',
        'Task assigned',
        'Invoice generated'
    ];
    
    const now = new Date();
    
    for (let i = 0; i < 5; i++) {
        const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
        const title = activityTitles[Math.floor(Math.random() * activityTitles.length)];
        const timestamp = new Date(now - Math.floor(Math.random() * 86400000 * 7)); // Random time in the last 7 days
        
        activities.push({
            type,
            title,
            timestamp: timestamp.toISOString()
        });
    }
    
    return activities;
} 